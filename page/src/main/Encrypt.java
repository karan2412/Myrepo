package main;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;

/**
 * Servlet implementation class encrypt
 */
@WebServlet("/encrypt")
public class Encrypt extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			
			String content = "", z = "", y = "", fileName = "";
			
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletContext servletContext = this.getServletConfig().getServletContext();
			File repository = (File) servletContext.getAttribute("javax.servlet.context.tempdir");
			factory.setRepository(repository);
			ServletFileUpload upload = new ServletFileUpload(factory);
			List<FileItem> items = upload.parseRequest(new ServletRequestContext(request));
			
			Iterator<FileItem> iter = items.iterator();
			while (iter.hasNext()) {
			    FileItem item = iter.next();

			    if (item.isFormField()) {
			    	switch (item.getFieldName()) {
		    		case "options":
		    			z = item.getString(); break;
		    		case "key":
		    			y = item.getString(); break;
	    			default:
		    			System.out.println("Ignore ..");	
			    	}
			    	System.out.println(item.getFieldName() + " -> " + item.getString());
			    } else {
			    	content = item.getString();
			    	fileName = item.getName();
			    }
			}
			
			int key =  Integer.parseInt(y);
			
			String msg = "";
			File f = null;
			if(z.equals("encrypt")) {
				msg = SDES.encrypt(content,key);
				f = new File("EncryptedFile.txt");
				out.write("<h3>Your file has been encrypted successfully.</h3><br><a href='/page/DownloadEncryptFile'>Download File</a>");
			} else {
				msg = SDES.decrypt(content,key);
				f = new File("DecryptedFile.txt");
				out.write("<h3>Your file has been decrypted successfully.</h3><br><a href='/page/DownloadDecryptFile'>Download File</a>");
			}
			if (f.exists()) {
				f.delete();
			}
			f.createNewFile();
			System.out.println(f.getAbsolutePath());

			
			Writer fstream = new OutputStreamWriter(new FileOutputStream(f), StandardCharsets.ISO_8859_1);
			fstream.write(msg);
			fstream.close();

		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileUploadException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}


