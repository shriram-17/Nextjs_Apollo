import fs from "fs";

export const resolvers = {
    Mutation: {
        uploadFile: async (parent: any, { filename, size, type, content }: any, context: any) => {
            const { createReadStream, mimetype } = await content;
            const stream = createReadStream();
            const path = `./uploads/${filename}`;
            await new Promise((resolve, reject):void => {
                stream
                    .on('error', (error: Error) => {
                        if (stream.truncated) fs.unlinkSync(path);
                        reject(error);
                    })
                    .pipe(fs.createWriteStream(path))
                    .on('error', (error: Error) => reject(error))
                    .on('finish', () => resolve(undefined));
            });

            return {
                id: 1,
                filename,
                size,
                type,
                content: mimetype
            };
        }
    }
};