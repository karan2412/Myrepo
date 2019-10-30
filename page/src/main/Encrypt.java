package main;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
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
			
			int result =  Integer.parseInt(y);
			
			String msg = "";
			if(z.equals("encrypt")) {
				msg = SDES.encrypt(content,result);
				out.println( "success");
			}
			else {
				msg = SDES.decrypt(content,result);
				out.println(msg);
			}
//			File file = new File(fileName);
//			System.out.println(file.getAbsolutePath());
//			file.mkdirs();
//			BufferedWriter oout = new BufferedWriter(new FileWriter(file,StandardCharsets.ISO_8859_1)); 
			
//			oout.write(msg);
//			System.out.println( "success");
//			oout.close();
			out.write(msg);
	         
			
			  String mimeType = "application/octet-stream";
			  System.out.println("MIME type: " + mimeType);
			  
			  // modifies response response.setContentType(mimeType); // forces download
			  String headerKey = "Content-Disposition"; String headerValue =
			  String.format("attachment; filename=\"%s\"", fileName);
			  response.setHeader(headerKey, headerValue);
			  
			  // obtains response's output stream 
			  OutputStream outStream = response.getOutputStream(); 
			  outStream.write(msg.getBytes());
			  outStream.close();
			 
			
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileUploadException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}


