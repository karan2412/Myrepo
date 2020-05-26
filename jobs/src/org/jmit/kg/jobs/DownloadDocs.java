package org.jmit.kg.jobs;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Blob;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jmit.kg.jobs.util.JobUtils;

@WebServlet("/uploadDoc")
@MultipartConfig
public class DownloadDocs extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String rollNo = request.getParameter("ROLLNO");
		String docType = request.getParameter("DOCTYPE");
		String columnName = "";
		switch (docType) {
		case "10file":
			columnName = "file_10";
			break;
		case "12file":
			columnName = "file_12";
			break;
		case "gradfile":
			columnName = "file_grad";
			break;
		case "pgradfile":
			columnName = "file_postgrad";
			break;
		default:
			System.out.println("Invalid doc type to download.");
		}
		try {
			Statement stmt = JobUtils.getConnection();
			ResultSet rs = stmt.executeQuery("SELECT "+ columnName +" FROM USERS WHERE roll_number = " + rollNo);
			
			if (rs.next()) {
				Blob b = rs.getBlob(1);
				PrintWriter out = response.getWriter();  
				response.setContentType("APPLICATION/OCTET-STREAM");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + columnName + "\"");
				InputStream fileInputStream = b.getBinaryStream();
				int i;
				while ((i = fileInputStream.read()) != -1) {
					out.write(i);
				}
				fileInputStream.close();
				out.close();
			} else {
				request.setAttribute("ERROR_MSG", "Document not found !!!");
				request.setAttribute("SUCCESS_MSG", "");
				RequestDispatcher rd=request.getRequestDispatcher("users");
				rd.forward(request, response);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
