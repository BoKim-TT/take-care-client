import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --color-cyan: #5FB4A2;
    --color-beige: #dfd8ca;
    --color-dark-beige:  #BB9981;
    --color-dark-blue: #203A4c;
    --color-dark-gray: #33323D;
    --color-light-gray: #EAEAEB;
    --color-purple-gray: #9a99ab;
    --color-white: #FAFAFA;
    --color-bright-red:#F43030;
    --font-heading: 'Ibarra Real Nova', sans-serif, Arial, Helvetica,;
    --font-body:  'Public Sans', sans-serif,Arial, Helvetica;
 
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      outline:0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      font-family: var(--font-body);
  }

  body {
    width: 100vw;
    background: top url('images/background-img4.jpg');
 
}
  ol, ul, li {
      list-style: none;
      text-decoration:none;
  }

  button {
    border: none;
  }
  
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
 




`;
