'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto 
            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum 
            deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non 
            provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum 
            fuga. `

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: text,
    //onUpdate:  ,
    editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
        },
      },
  })

  return <EditorContent editor={editor} className='border-none ring-0'/>
}

export default Tiptap
