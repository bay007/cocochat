import React, { Component } from 'react';
import styled from 'styled-components';
//import './onHand.css';
import ChatStore from './ChatStore';
import { observer } from 'mobx-react';
const helpIconStandBy = 'https://s3.amazonaws.com/coco-aws-chat/icons-images/help-icon-standBy.png';
const loadingIconWaitingResponse = 'https://s3.amazonaws.com/coco-aws-chat/icons-images/loading-icon-waitingResponse.gif';
const sendIconSendQuestion = 'https://s3.amazonaws.com/coco-aws-chat/icons-images/send-icon-SendQuestion.png';

class App extends Component {
  state = {
    isWidgetStandBy: true,
    windowSize: { height: 100, width: 200 },
    colorHeader: "#52b3d9",
    colorBody: "#F3EFE0",
    audio: new Audio(
      'data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU='
    )
  }



  questionArea = (event) => {
    let newText = event.target.value;

    newText.length < 240
      ? ChatStore.setQuestionAreaMessage(newText)
      : this.state.audio.play();
  }

  addUserMessage = (event) => {

    if (event === 'sentByIcon') {
      if (ChatStore.getQuestionAreaMessage.length > 0) {
        //1%2=>1   le va al usuario
        ChatStore.processUserMessage(ChatStore.getQuestionAreaMessage.trim())
      }
    }
  }


  componentWillMount() {

    let _height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;



    let _width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.setState({ windowSize: { height: _height, width: _width } })


    let colorHeader = document.getElementById('coconnut-chat-widget').getAttribute('color-header');
    if (colorHeader) {
      this.setState({ colorHeader: colorHeader })
    }
    let colorBody = document.getElementById('coconnut-chat-widget').getAttribute('color-body');
    if (colorBody) {
      this.setState({ colorBody: colorBody })
    }


    console.log(`Alto: ${_height}`);
    console.log(`Ancho: ${_width}`);
  }


  componentDidUpdate() {
    try {
      document.getElementsByClassName('coconutt-chat-chat')[
        0
      ].scrollTop = 2147483637;
    } catch (e) {

    }
  }

  chatWidth = () => {
    let width = this.state.windowSize.width;

    if (width < 400) {
      return { maxWidth: width - 20 };
    }

    if (width >= 400 && width < 720) {
      return { maxWidth: width * 0.65 };
    }

    if (width >= 721 && width < 1280) {
      return { maxWidth: width * 0.42 };
    }

    if (width >= 1281 && width < 1440) {
      return { maxWidth: width * 0.27 };
    }

    if (width >= 1440 && width < 1920) {
      return { maxWidth: width * 0.22 };
    }

    if (width < 1920) {
      return { maxWidth: width * 0.21 };
    }
  }


  render = () => {
    const ChatStore = this.props.ChatStore;
    let s = {
      CoconuttChatStandby: styled.div`
        img{
            height:auto;
            float:right;
            margin:0px;
            background-color: transparent;
            padding: 0px;
            cursor:pointer;
               width: 15%;
        }`,

      CoconuttChatMenu: styled.div`{
        display:flex;
        flex-direction:row;
        background-color: ${this.state.colorHeader};
        }`,

      CoconuttChatMenuImg: styled.div` 
    img{
        width:15%;
        height: auto;
        margin-right:10px;
        border-radius:7px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        -ms-border-radius: 100%;
        margin-left: 5%;
        background-color: rgba(255,255,255,0.98);
        cursor:pointer;
    }`,

      CoconuttChatName: styled.div`{
        position: absolute;
        right: 10%;
        font-family: 'Lato';
        font-size: 150%;
        font-weight: 300;
        color: rgba(255,255,255,0.98);
        cursor: default;
    }`,

      CoconuttChatChat: styled.div`{
            overflow-y:auto;
            padding-left:15px;
            padding-right:15px;
            background-color: ${this.state.colorBody};
            max-height:${this.state.windowSize.height * 0.60}px
            min-height:${this.state.windowSize.height * 0.45}px
        }`,

      CoconuttChatChatOlLi: styled.div`{
        li{
            list-style:none;
            display:flex;
            overflow-wrap: break-word;
            flex-direction:column;
            
            margin-top:0px;
           
        }
    }`,

      CoconuttChatMsg: styled.div`{
        background: white;
        padding-top: 10px;
        padding-right: 10px;
        padding-left: 10px;
    }`,

      CoconuttChatMsgTime: styled.div`{
        font-size: 70%;
        color: #ccc;
        margin-top: 5px;
        float: left;
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }`,

      CoconuttChatTextarea: styled.div`{
        background: #EEECE1;
    }`,
      CoconuttChatMsgP: styled.div`{
        p {
          font-size: 110%;
          margin: 0 0 0.25rem 0;
          color: #777;
        }
    }`,

      CoconuttChatTextareaTextarea: {

        overflow: "hidden",
        width: "80%",
        float: "left",
        resize: "none",
        height: "2em",
        background: "rgba(181, 181, 191, 0.57)",
        border: "none",
        outline: "none",
        padding: "5px",
        color: "#666",
        fontSize: "135%",
        borderRadius: "5px"

      },

      CoconuttChatTextareaImg: styled.div`{
        img{
            width:15%;
            height: auto;
            border-radius:100px;
            cursor: pointer;
            float:rigth;
        }
    }`,

      CoconuttChatUser: styled.div`{
        box-shadow:  3px 4px 0px 1px #D8d4D4;
        margin:5px;
        position:relative;
        right:-5px;
        float:right;
        margin-bottom: 20px;
    }`,

      CoconuttChatAgent: styled.div`{
        box-shadow:  -3px 4px 0px 1px #D8d4D4;
        position:relative;
        left:-35px;
        float:left;
        margin-bottom: 20px;
    }`

    }

    const Message = ({ message }) => {
      return (<li autoFocus key={message.id}>

        <s.CoconuttChatMsg className="coconutt-chat-msg">
          <s.CoconuttChatMsgP>
            <p>
              {message.messageLines.join(' ')}
            </p>
          </s.CoconuttChatMsgP>
          <s.CoconuttChatMsgTime>
            <time>{message.time}</time>
          </s.CoconuttChatMsgTime>
        </s.CoconuttChatMsg>
      </li>)
    }

    const UserMessage = ({ message }) => {
      return (
        <s.CoconuttChatUser >
          <Message message={message} />
        </s.CoconuttChatUser>
      )
    }

    const AgentMessage = ({ message }) => {
      return (
        < s.CoconuttChatAgent >
          <Message message={message} />
        </s.CoconuttChatAgent >
      )
    }

    if (this.state.isWidgetStandBy)
      return (
        <s.CoconuttChatStandby className="coconutt-chat-standby">
          <img
            src={helpIconStandBy}
            onClick={() => {
              this.setState({ isWidgetStandBy: !this.state.isWidgetStandBy });
            }}
          />
        </s.CoconuttChatStandby>
      );
    else
      return (
        <div style={this.chatWidth()}>
          <s.CoconuttChatMenu className="coconutt-chat-menu">
            <s.CoconuttChatMenuImg>
              <img
                src={ChatStore.chat.agentAvatar}
                draggable="false"
                alt={ChatStore.chat.agentName}
                onClick={() => {
                  this.setState({ isWidgetStandBy: !this.state.isWidgetStandBy });
                }}
              />
            </s.CoconuttChatMenuImg>


            <s.CoconuttChatName className="coconutt-chat-name">
              {ChatStore.chat.agentName}
            </s.CoconuttChatName>

          </s.CoconuttChatMenu>
          <s.CoconuttChatChat className="coconutt-chat-chat" >
            <ol>
              {
                ChatStore.chat.messages.map((message, k) => {
                  return (
                    <s.CoconuttChatChatOlLi key={k}>
                      {
                        message.id % 2 === 1 ? <UserMessage message={message} /> : <AgentMessage message={message} />
                      }
                    </s.CoconuttChatChatOlLi>
                  );
                })
              }

            </ol>
          </s.CoconuttChatChat>


          <textarea
            style={s.CoconuttChatTextareaTextarea}
            onChange={this.questionArea}
            value={ChatStore.getQuestionAreaMessage}
            onKeyDown={this.addUserMessage}
            minLength="1"
            maxLength="240"
            wrap="on"
            rows="2"
            readOnly={ChatStore.isErrorExistsOnPNLProcessMessage ? true : false}
            placeholder="¿Cual es su pregunta?"
          />


          <s.CoconuttChatTextareaImg>
            {
              ChatStore.isPNLProcessingMessage ?
                <img src={loadingIconWaitingResponse} />
                :

                <img src={sendIconSendQuestion}
                  onClick={this.addUserMessage.bind(this, 'sentByIcon')} />
            }
          </s.CoconuttChatTextareaImg>
        </div >
      );
  }
}

export default observer(App);
