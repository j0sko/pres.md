
<script lang="ts">
  import { onMount } from "svelte";
  import { basicSetup, EditorView } from "codemirror";
  import { css } from "@codemirror/lang-css";

  export let value: string;

  let editor: EditorView;

  onMount(() => {
    const parent = document.getElementById("editor");
    if (parent) {
      const extensions = [
        basicSetup,
        css(),
        EditorView.theme({
          '.CodeMirror': {height: '500px'}
        })
      ];

      editor = new EditorView({
          doc: value,
          extensions,
        parent,
      });

      editor.dom.addEventListener("keyup", () => {
        value = editor.state.doc.toString();
      });
    }
  });
</script>

<style>
  .editor-container {
    width: 30%;
    overflow-y: scroll;
    height: 500px; 
  }
</style>

<div class="editor-container">
  <div id="editor"></div>
</div>
