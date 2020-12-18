import React from "react";
import {Editor} from '@tinymce/tinymce-react';
const TinyEditor = ({formik}: any) =>{
    const handleEditorChange = (content: any, editor: any) => {
        console.log('Content was updated:', content);
        formik.setFieldValue('body', content);
    }

    return(
        <Editor
            id="blogPost"
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'textcolor colorpicker',
                ],
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                image_caption: true,
                file_picker_types: 'image',
                image_title: true,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={handleEditorChange}
        />
    );
}

export default TinyEditor;
