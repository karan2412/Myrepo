package org.jmit.kg.jobs;


import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.sun.mail.smtp.SMTPTransport;

public class EmailSender {

    // for example, smtp.mailgun.org
    private static final String SMTP_SERVER = "smtp.gmail.com";
    private static final String USERNAME = "jmit1216@gmail.com";
    private static final String PASSWORD = "Mukandjmit@1216";

    private static final String EMAIL_FROM = "jmit1216@gmail.com";
   // private static final String EMAIL_TO = "email_1@yahoo.com, email_2@gmail.com";
    //private static final String EMAIL_TO_CC = "";

    private static final String EMAIL_SUBJECT = "Confirmation Email";
   // private static final String EMAIL_TEXT = "<h1>Hello Java Mail \n ABC123</h1>";

    public static void send(String emailTo, String emailBodyHtml) {

        Properties props = System.getProperties();
        //prop.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
      //.put("mail.smtp.socketFactory.port", "25");
       // props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "25");
        Session session = Session.getInstance(props, null);
        Message msg = new MimeMessage(session);

        try {

            msg.setFrom(new InternetAddress(EMAIL_FROM));

            msg.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(emailTo, false));

            msg.setSubject(EMAIL_SUBJECT);

			// TEXT email
            //msg.setText(EMAIL_TEXT);

			// HTML email
            msg.setDataHandler(new DataHandler(new HTMLDataSource(emailBodyHtml)));


			SMTPTransport t = (SMTPTransport) session.getTransport("smtp");

			// connect
            t.connect(SMTP_SERVER, USERNAME, PASSWORD);

			// send
            t.sendMessage(msg, msg.getAllRecipients());

            System.out.println("Response: " + t.getLastServerResponse());

            t.close();

        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }

    static class HTMLDataSource implements DataSource {

        private String html;

        public HTMLDataSource(String htmlString) {
            html = htmlString;
        }

        @Override
        public InputStream getInputStream() throws IOException {
            if (html == null) throw new IOException("html message is null!");
            return new ByteArrayInputStream(html.getBytes());
        }

        @Override
        public OutputStream getOutputStream() throws IOException {
            throw new IOException("This DataHandler cannot write HTML");
        }

        @Override
        public String getContentType() {
            return "text/html";
        }

        @Override
        public String getName() {
            return "HTMLDataSource";
        }
    }
}
