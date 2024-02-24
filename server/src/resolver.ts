import CryptoJS from 'crypto-js';
import {FileEntity} from "./entity/FileEntity";
import {AppDataSource} from "./data-source";


export const resolvers = {
        Query:{
            getFiles:async (parent:any,content:any) => {
                const file = AppDataSource.getRepository(FileEntity)
                return await file.find()
            },
            getFileByFileName : async (parent:any,{fileName}:{fileName:String},content:any) => {
                console.log(fileName)
                return {
                    id:1,
                    size:45,
                    type:"text/plain",
                    content:"aasfdasfsf"
                }
            }
        },
        Mutation: {
            uploadFile: async (parent: any, { filename, size, type, content }: any, context: any) => {
                const encryptedContent = CryptoJS.AES.encrypt(content,  "unknown").toString();
                const File = AppDataSource.getRepository(FileEntity)
                const file = new FileEntity()
                file.filename = filename
                file.size = size
                file.type = type
                file.content = encryptedContent
                return await File.save(file)
            }
        }
    };