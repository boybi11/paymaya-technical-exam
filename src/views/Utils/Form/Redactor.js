import React, {useState, useEffect} from 'react';
import { Label } from 'reactstrap';
import { EditorState, convertFromRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Redactor = ({
    className = '',
    style = {},
    onChange,
    ...props
}) => {
    const [editorState, setEditorState] = useState(props.value ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.value))) : EditorState.createEmpty());
    const [contentState, setContentState] = useState();
    const defaultOptions = ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'remove', 'history'];

    const setContent = (content) => {
        setContentState(content);
        onChange({target: {value: draftToHtml(content), name: props.name}});
    }

    const onBlur = () => {
        if (props.onBlur) {
            props.onBlur({target: {value: JSON.stringify(contentState), name: `${props.name}_draft`}});
        }
    }
    

    return (
        <div>
            {
                props.label ? (
                    <div className="margin-bottom">
                        <Label className="txt-medium txt-regular">
                            {props.label}
                        </Label>
                    </div>
                ) : null
            }
             <Editor
                editorState={editorState}
                wrapperClassName="redactor"
                editorClassName="redactor-editor"
                toolbarClassName="redactor-toolbar"
                onEditorStateChange={e => setEditorState(e)}
                onContentStateChange={e => setContent(e)}
                onBlur={() => onBlur()}
                onFocus={() => props.onFocus ? props.onFocus() : {}}
                toolbar={
                    Object.assign(
                        {},
                        {options: props.options ? props.options : defaultOptions}
                    )
                }
            />
            {props.error &&
                <div className="flex flex-end margin-top form-control-error">
                    <div className="badge badge-error text-right txt-light txt-small">
                        <i className="fas fa-exclamation-circle margin-right"/>
                        {props.error}
                    </div>
                </div>
            }
        </div>
    );
};

export {Redactor};