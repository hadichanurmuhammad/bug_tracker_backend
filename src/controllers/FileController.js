import fs from 'fs/promises'
import path from 'path'
let __dirname = path.resolve(path.dirname(''));


class FileController {
    static async createFile (req, res) {
        let fileBase
        try {
            const fileElement = req.files.file
            if(!fileElement) throw new Error("File not found")
            if((fileElement.size / 1024) > (50 * 1024)) throw new Error("File size is over size")
            const type = fileElement.name.split(".")[fileElement.name.split(".").length - 1]
            const file = await req.postgres.file_model.create({
                type: type,
                user_id: req.user
            })
            fileBase = file
            const filePath = path.join(__dirname, "src", "public", "files", `${file.dataValues.photo_id}.` + type)

            const savedFile = await fs.writeFile(filePath, fileElement.data)

            await res.status(201).json({
                ok: true,
                message: "File uploaded",
                file: file
            })

        } catch (error) {
            if(fileBase) {
                await req.postgres.file_model.destroy({
                    where: {
                        id: fileBase.dataValues.photo_id
                    }
                })
            }
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}

export default FileController