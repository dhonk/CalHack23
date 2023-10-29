import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FormEvent, useState } from "react";
import { tes_OCR, pdf_to_png, file_eval, translation } from "../process-utils";

export default function UploadButton() {

   const sendParsedText = useMutation(api.functions.sendParsedText);
   const [imagePath, setImagePath] = useState("");
   const [text, setText] = useState("");
   // Change user name in chatWindow.tsx too
   const [user, setUser] = useState("Danny")

   function submitForm(e) {
      e.preventDefault()
      console.log(imagePath, "is the url")

      if (file_eval(imagePath) === "application/pdf") {
         console.log("ispdf");
      }

      const result = tes_OCR(imagePath)
         .catch(err => {
            console.error("handleClick error: ", err);
         })
         .then(result => {
            let text = result;
            setText(translation(text));
            console.log(text);
            sendParsedText({ text: text, user: user });
         })
   }

   return <>
      <div className="currentImgContainer">
         <img
            src={imagePath} className="fileImage" alt="File for upload" />
      </div>
      <div className="fileUploadContainer">
         <form action="submit" onSubmit={submitForm}>
            {/* <button className="button-upload" onClick={handleClick}>
               Select a file
            </button> */}
            <input
               className="button-upload"
               type="file"
               accept="image/png"
               onChange={(event) => {
                  setImagePath(URL.createObjectURL(event.target.files![0]));
               }}
            />
            <input
               type="submit" value={"Upload"} className="uploadButton" />
         </form>
      </div>
   </>
}