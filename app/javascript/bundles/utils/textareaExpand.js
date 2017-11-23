export default function textareaExpand(textarea){
  textarea.keyup(function() {
    const height = parseInt($(this).css('height'), 10)
    if( height + 39 < this.scrollHeight){
      $(this).css('height', `${this.scrollHeight}px`)
    }
  });
  textarea.characterCounter();
}
