import { Link } from '@mantine/tiptap';

import { debounce } from 'lodash';

import { useEditor } from '@tiptap/react';
import js from 'highlight.js/lib/languages/javascript'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

function GetEditor (props) {
    const {content,currentIndexRef,taskTypeRef,setTaskType,handleTaskUpdateNew,setNewTaskDescription
    } = props;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            Underline,
            BulletList,
            ListItem,
            Paragraph,
            Link,
            Superscript,
            SubScript,
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure(
                { placeholder: "Write your task description"  }),
            CodeBlockLowlight.configure({
                lowlight: createLowlight({
                    js, // Only load the languages you need
                }),
            
            }).extend({
                addKeyboardShortcuts() {
                    return {
                        Tab: () => {
                            if (this.editor.isActive("codeBlock")) {
                                return this.editor.commands.insertContent("\t");
                            }
                        },
                    };
                },
            }),
        ],
        content,
        onUpdate: debounce((props) => {
            const description = props.editor.getHTML();

            handleTaskUpdateNew ?
            handleTaskUpdateNew(
                taskTypeRef.current[currentIndexRef.current],
                description,
                "description",
                taskTypeRef.current,
                setTaskType,
                currentIndexRef.current
            ) : setNewTaskDescription(description);
            }, 300),
        editorProps: {
            handleKeyDown(view, event) {
                if (event.metaKey && event.shiftKey && event.key === '-') {
                    event.preventDefault();
                    editor.commands.setHorizontalRule();
                    return true;
                }
                return false;
            },
        },
    });
    return editor;
}

export {GetEditor}