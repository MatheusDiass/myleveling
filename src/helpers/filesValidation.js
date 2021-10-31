const VIDEOEXTENSIONS = ['mp4', 'mkv', 'avi', 'mpeg', 'mov']

const FILEEXTENSIONS = ['docx', 'pdf', 'txt']

//Valida se a extenção do vídeo é permitida
export function videoValidation(file) {
    console.log(file);
   if (file) {
      const extension = file.name.split('.')[1]

      if (VIDEOEXTENSIONS.includes(extension)) {
         return true
      } else {
         return false
      }
   }
}

//Valida se a extenção do arquivo é permitida
export function fileValidation(file) {
   if (file) {
      const extension = file.name.split('.')[1]

      if (FILEEXTENSIONS.includes(extension)) {
         return true
      } else {
         return false
      }
   }
}
