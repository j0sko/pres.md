const preview = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Style preview</title>
    <script>
window.addEventListener('DOMContentLoaded', () => {
    const styles = document.getElementById('style');
    window.addEventListener('message', (event) => {
      if (event.data.type === 'applyStyles') {
        styles.innerText = event.data.style;
      }
    });
})
    </script>
  </head>
  
  <body>
    <style id="style"></style>
    <div class="intro">
      <div class="slide-preview">
        <div class="remark-slide-container">
          <div class="remark-slide">
            <h2>Bricks</h2>
            <h4>Bottom text</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="slide-preview">
        <div class="remark-slide-container">
          <div class="remark-slide">
            <h3>Epic sagas</h3>
            <ul>
              <li>Dune</li>
              <li>Hyperion Cantos</li>
              <li>Foundation</li>
              <li>Game of Thrones</li>
            </ul>
            <img src="" alt="Preview image" />
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`
export default preview;
