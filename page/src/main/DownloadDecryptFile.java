package main;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DownloadDecryptFile")
public class DownloadDecryptFile extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		System.out.println("Find the temp file.");

		File f = new File("DecryptedFile.txt");
		System.out.println(f.getAbsolutePath());
		
		response.setContentType("text/plain");
		response.setHeader("Content-disposition", "attachment; filename=DecryptedFile.txt");
 
        try(InputStream in = new FileInputStream(f);
          OutputStream out = response.getOutputStream()) {
 
            byte[] buffer = new byte[1048];
         
            int numBytesRead;
            while ((numBytesRead = in.read(buffer)) > 0) {
                out.write(buffer, 0, numBytesRead);
            }
        } catch (FileNotFoundException e) {
        	System.out.println("Decrypted file is missing !!");
        } catch (Exception e) {
        	System.out.println("Unable to download file due to technical error !!");
        }
	}

}
