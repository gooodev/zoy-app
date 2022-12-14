import fs from "fs/promises";
import * as ImageSize from 'image-size';
import jsdom from "jsdom";
const {
    KINTONE_DOMAIN,
    KINTONE_APP_ID,
    KINTONE_AUTH,
    NEXT_PUBLIC_YEAR
} = process.env;

const fetchWorkRecord = async (workId) => {
    const res = await fetch(`https://${KINTONE_DOMAIN}/k/v1/record.json?app=${KINTONE_APP_ID}&id=${workId}`, {
        headers: {
            'X-Cybozu-Authorization': KINTONE_AUTH
        }
    });
    const { record } = await res.json();
    const { title, designAssignees, mainPicture, supportAssistant } = record;
    return {
        title: title.value,
        designerCode: designAssignees.value[0].code,
        mainPictureKey: mainPicture.value[0].fileKey,
        assistantCodes: supportAssistant?.value?.map(v => v.code) || [],
    }
}

const fetchFileBlob = async (fileKey) => {
    const res = await fetch(`https://${KINTONE_DOMAIN}/k/v1/file.json?fileKey=${fileKey}`, {
        headers: {
            'X-Cybozu-Authorization': KINTONE_AUTH
        }
    });
    return await res.blob();
}

const storePicture = async (blob, id) => {
    const arrayBuffer = await blob.arrayBuffer();
    const ext = calcFileExtension(blob.type);
    const buffer = Buffer.from(arrayBuffer);
    const dimension = ImageSize.imageSize(buffer);
    const imagePath = `/images/${NEXT_PUBLIC_YEAR}/${id}.${ext}`;
    await fs.writeFile(`${process.cwd()}/public/${imagePath}`, buffer);
    return { src: imagePath, height: dimension.height, width: dimension.width };
}

const parseResourceTsv = async () => {
    const resource = await fs.readFile(`${process.cwd()}/scripts/resource/${NEXT_PUBLIC_YEAR}.tsv`);
    return resource.toString().split("\n").map(v => {
        const row = v.split("\t")
        return { id: row[0], comment: row[1] }
    })
}

const calcFileExtension = (type) => {
    switch (type) {
        case "image/jpeg":
            return "jpg";
        case "image/png":
            return "png";
        default:
            throw new Error(`Invalid file type: ${type}`);
    }
}

const fetchUsers = async () => {
    const users = [];
    for (let i = 0; i < 5; i++) {
        const res = await fetch(`https://${KINTONE_DOMAIN}/v1/users.json?offset=${i * 100}`, {
            headers: {
                'X-Cybozu-Authorization': KINTONE_AUTH
            }
        });
        const data = await res.json();
        if (data.users.length === 0) {
            break;
        }
        users.push(...data.users.map(user => ({
            name: user.name,
            url: user.url,
            code: user.code,
        })));
    }
    return users;
}

const fetchAvatarSrc = async (url) => {
    const res = await fetch(url);
    const htmlText = await res.text();
    const dom = new jsdom.JSDOM(htmlText);
    const src = dom.window.document.querySelector(
        'section.c-section.c-section--border > div > div.t-member-detail__thumb > img',
    )?.src || null
    return src;
}

const main = async () => {
    const workList = [];
    const workResources = await parseResourceTsv();
    const users = await fetchUsers();
    for (const work of workResources) {
        try {
            const workRecord = await fetchWorkRecord(work.id);
            const pictureBlob = await fetchFileBlob(workRecord.mainPictureKey);
            const image = await storePicture(pictureBlob, work.id);
            const designer = users.find(v => v.code === workRecord.designerCode)
            const designerAvatarSrc = await fetchAvatarSrc(designer.url);
            const assistantsPromise = workRecord.assistantCodes.map(async (v) => {
                const assistant = users.find(u => u.code === v);
                const avatarSrc = await fetchAvatarSrc(assistant.url);
                return {
                    name: assistant.name,
                    avatarSrc,
                }
            });
            const assistants = await Promise.all(assistantsPromise);
            workList.push({
                id: work.id,
                comment: work.comment,
                title: workRecord.title,
                mainImage: image,
                workUrl: `https://${KINTONE_DOMAIN}/k/${KINTONE_APP_ID}/show#record=${work.id}`,
                designer: {
                    name: designer.name,
                    avatarSrc: designerAvatarSrc
                },
                assistants
            });
        } catch (e) {
            console.error("===========");
            console.error("Error occured:" + work.id);
            console.error(e);
            console.error("===========");
        }
    }
    await fs.writeFile(`${process.cwd()}/public/works/${NEXT_PUBLIC_YEAR}.json`, JSON.stringify(workList));
}
await main()