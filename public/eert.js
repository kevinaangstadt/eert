'use strict';

const path = require('path');
const klawSync = require('klaw-sync');
const { construct } = require('harmony-reflect');

const traverseDirectory = (dir, absolute=false) => {
    dir = path.resolve(dir);

    let paths;
    try {
        paths = klawSync(dir, {nodir: true});
    } catch (err) {
        console.error(err);
        return;
    }

    return paths.map(p => {
        // +1 to remove the slash
        return absolute ? p.path : p.path.substring(dir.length + 1);
    });

};

const constructTree = (paths) => {
    const del = path.sep;

    var tmp = 0;

    const assign = (obj, keyPath, value) => {

        // if(keyPath.includes('hacking_with_php'))
        //     console.log('break');
        // if(tmp == 52339)
        //     console.log("here");
        
        const lastKeyIndex = keyPath.length-1;
        for (var i = 0; i <= lastKeyIndex; ++ i) {
          const key = keyPath[i];
          if (!(key in obj)){
            obj[key] = (key === '.' ? [] : {});
          }
          obj = obj[key];
        }
        // // check of this path has been used before
        // if (!(keyPath[lastKeyIndex] in obj)){
        //     obj[keyPath[lastKeyIndex]] = [];
        // }
        // obj = obj[keyPath[lastKeyIndex]];
        // console.log(tmp);
        
        if (!Array.isArray(obj)) {
            // add a "." folder if it doesn't exist
            if (!('.' in obj)) {
                obj['.'] = [];
            }
            obj = obj['.'];
        }

        obj.push(value);
        tmp++;
    };

    let tree = {};

    paths.forEach(p => {
        const parts = path.dirname(p).split(del);
        const val = path.basename(p);

        assign(tree, parts, val);
    });

    console.log("done");

    return tree;
};

const renderTree = (tree, indent=0) => {

    const getIndentString = (indent) => {
        let s = "";
        for (let i=0; i<indent; i++) {
            s += "|  ";
        }
        return s;
    }

    const renderFile = (file, indent) => {
        return `${getIndentString(indent)}+--${file}\n`;
    }

    let files = [];

    if ('.' in tree) {
        files = tree['.'];
    }

    let lines = Object.entries(tree).map(entry => {
        const [key, value] = entry;
        // skip list of files
        if (key === '.') {
            return;
        }
        return `${getIndentString(indent)}+--${key}\n${renderTree(value, indent + 1)}`;
    });
    if (typeof(files.map) === 'undefined') 
        console.log("break");
    lines.push(...files.map(entry => {
        return renderFile(entry, indent);
    }));

    return lines.join('');
}

module.exports.traverseDirectory = traverseDirectory;
module.exports.constructTree = constructTree;
module.exports.renderTree = renderTree;
