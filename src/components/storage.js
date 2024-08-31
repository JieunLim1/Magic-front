import React from 'react';
import webvtt from 'node-webvtt';

function DownloadVTTButton({ id }) {
    console.log(`this is id: ${id}`);
    const getCurrentList = () => {
        const content = localStorage.getItem(id);
        if (content) {
            const contentJson = JSON.parse(content);
            return contentJson.video || [];
        }
        return [];
    };

    const generateVTT = () => {
        const subtitleBlocks = getCurrentList(); // video object
        const cues = subtitleBlocks.subtitle.map(block => ({
            identifier: '',
            start: block.start,
            end: block.end,
            text: block.text,
            styles: '',
        }));
        const str_lang = JSON.stringify(subtitleBlocks.source_lang)

        const vttData = {
            meta: {Language: str_lang},
            cues,
            valid: true
        };

        const vttContent = webvtt.compile(vttData); //json to vtt

        const blob = new Blob([vttContent], { type: 'text/vtt' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'subtitles.vtt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={generateVTT}>
            Download VTT File
        </button>
    );
}

export default DownloadVTTButton;
