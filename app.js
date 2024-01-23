document.addEventListener( 'DOMContentLoaded', () => {
  // load the no_message template at first
  const noMessage = document.querySelector( '#no_message' );
  const message = document.querySelector( '#message' );
  const encryptButton = document.querySelector( "#encrypt_button" );
  const decryptButton = document.querySelector( "#decrypt_button" );
  const copyButton = document.querySelector( "#copy_button" );

  noMessage.style.display = 'block';
  message.style.display = 'none';

  encryptButton.addEventListener( 'click', () => {
    const text = document.querySelector( '#message_input' ).value;
    if ( text.length === 0 ) {
      showToast( 'Please enter a message', false );
      return;
    }
    const encryptedText = encryptText( text );

    document.querySelector( '#result_text' ).textContent = encryptedText;
    noMessage.style.display = 'none';
    message.style.display = 'flex';
  } )

  decryptButton.addEventListener( 'click', () => {
    const text = document.querySelector( '#message_input' ).value;
    const decryptedText = decryptText( text );

    document.querySelector( '#result_text' ).textContent = decryptedText;
    noMessage.style.display = 'none';
    message.style.display = 'flex';
  } )

  copyButton.addEventListener( 'click', () => {
    const text = document.querySelector( '#result_text' ).textContent;
    navigator.clipboard.writeText( text );
    showToast( 'Copied to clipboard' );
  } )

  // set default text on load
  document.querySelector( '#message_input' ).value = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper sodales odio. Morbi volutpat, leo non euismod tristique, tortor metus volutpat diam, eget vulputate lorem felis eu eros. Morbi ullamcorper nisi nec justo interdum varius. Donec vel quam at lorem porta consequat. Praesent quis luctus leo. Nullam interdum ante vitae nisl blandit pretium. Sed in blandit augue, quis interdum risus. Nulla non feugiat purus. Maecenas lacinia ut orci eget ultrices.`;

} )

function encryptText ( text ) {
  const words = text.split( ' ' );
  const encryptedText = words.map( word => {
    const chars = word.split( '' );
    const encryptedChars = chars.map( char => {
      const charCode = char.charCodeAt( 0 );
      const encryptedCharCode = charCode + 10;
      return String.fromCharCode( encryptedCharCode );
    } );

    return encryptedChars.join( '' );
  } ).join( ' ' );

  return encryptedText;
}

function decryptText ( text ) {
  const words = text.split( ' ' );
  const decryptedText = words.map( word => {
    const chars = word.split( '' );
    const decryptedChars = chars.map( char => {
      const charCode = char.charCodeAt( 0 );
      const decryptedCharCode = charCode - 10;
      return String.fromCharCode( decryptedCharCode );
    } );

    return decryptedChars.join( '' );
  } ).join( ' ' );

  return decryptedText;
}

function showToast ( message, success = true ) {
  const toast = document.querySelector( '#toast' );
  const toast_message = document.querySelector( '#toast_message' );
  const toast_icon = document.querySelector( '#toast_icon' );

  toast.style.display = 'flex';
  toast_message.textContent = message;
  if ( success ) {
    toast_icon.src = 'assets/check.svg';
    toast.setAttribute( 'alt', 'Success' );
    toast.classList.replace( 'bg-red-500', 'bg-indigo-500' )
  } else {
    toast_icon.src = 'assets/error.svg';
    toast.setAttribute( 'alt', 'Error' );
    toast.classList.replace( 'bg-indigo-500', 'bg-red-500' )
  }

  toast.classList.add( 'toast_show' )

  setTimeout( () => {
    toast.classList.replace( 'toast_show', 'toast_hide' )
    setTimeout( () => {
      toast.style.display = 'none';
      toast.classList.remove( 'toast_hide' )
    }, 500 )
  }, 2000 )
}