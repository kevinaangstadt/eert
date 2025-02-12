import React, { useState } from 'react';

function DirectoryPrinter() {

    const [contents, setContents] = useState("");

    window.addEventListener('message', evt => {
        switch (evt.data.type) {
            case 'directory-tree':
                setContents(evt.data.data);
                break;
            default:
                break;
        };
    });

    return (
        <pre>
            {contents}
        </pre>
    )
}

export default DirectoryPrinter;