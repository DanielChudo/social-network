import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import autosize from 'autosize';
import * as Yup from 'yup';
import { Dialog, Message } from '../../components';
import { sendMessage } from '../../redux/dialogReducer';
import './DialogsPage.css';

function DialogsPage() {
  const messageTextRef = useRef(null);
  useEffect(() => {
    document.title = 'Сообщения';
    autosize(messageTextRef.current);
  }, []);

  const dialogs = useSelector((state) => state.dialogPage.dialogs);
  const messages = useSelector((state) => state.dialogPage.messages);

  return (
    <div id="dialogs">
      <div className="wrapper" style={{ padding: '0px', marginRight: '8px' }}>
        {dialogs.map((dialog) => (
          <Dialog
            key={dialog.id}
            id={dialog.id}
            name={dialog.name}
            surname={dialog.surname}
            emoji={dialog.emoji}
          />
        ))}
      </div>
      <div id="dialog" className="wrapper">
        <div id="dialog__history">
          <div id="messages">
            {messages.map((message) => (
              <Message text={message} />
            ))}
          </div>
        </div>
        <SendMessageForm messageTextRef={messageTextRef} />
      </div>
    </div>
  );
}

function SendMessageForm({ messageTextRef }) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        messageText: '',
      }}
      validationSchema={Yup.object({
        messageText: Yup.string().trim().required(),
      })}
      onSubmit={(values, { resetForm }) => {
        dispatch(sendMessage(values.messageText.trim()));
        resetForm();
        autosize.update(messageTextRef.current);
      }}
    >
      <Form id="dialog__send-message">
        <Field
          as="textarea"
          name="messageText"
          innerRef={messageTextRef}
          rows="1"
          placeholder="Напишите сообщение..."
        />
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
}

export default DialogsPage;
