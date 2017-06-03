import React , {PropTypes, Component} from 'react'
import config from '../config/config.js'
import PureRender from '../plugins/PureRender.js'
import MessageBox from './MessageBox.jsx'

function replaceContent(content){
    let repContent = content || '';
    const regLink = /((http|https):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i,
        regImg = /https?:\/\/.+\.(jpg|gif|png|svg|jpeg)/i,
        http = /^http/,
        regInvite = new RegExp(config.inviteLink,'i');

    repContent = repContent.replace(regLink, (r) =>{
        if(regImg.test(r)){
            return `<img class = 'Message-image' src = '${r}' />`;
        }
        if(regInvite.test(r)){
            return `<a href='${r}' target='_self' rel='noreferrer'>${r}</a>`;
        }
        if(!http.test(r)){
            return `<a href='http://${r}' target='_blank' rel='noreferrer'>${r}</a>`;
        }
        return `<a href='${r}' target='_blank' rel='noreferrer'>${r}</a>`;
    });
    return repContent;
}
function TextMessage(props){
    const content = replaceContent(props.content.get('content'));
    return(
        <MessageBox {...props}>
            <span dangerouslySetInnerHTML={ {__html: content}}></span>
        </MessageBox>
    );
}

export default PureRender(TextMessage);
