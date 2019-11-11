package org.jmit.kg.jobs;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jmit.kg.jobs.util.JobUtils;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Hello World ");
		
		String action = request.getParameter("action");
		System.out.println("Action called is " + action);
		
		try {
			Statement stmt = JobUtils.getConnection();  
			ResultSet rs = stmt.executeQuery("select * from users");
			
 			while (rs.next()) {
				System.out.println(rs.getInt(1));
				System.out.println(rs.getString(2));
				System.out.println(rs.getString(3));
				System.out.println(rs.getString(4));
				System.out.println(rs.getString(5));
				System.out.println(rs.getString(6));
				System.out.println(rs.getString(7));
				System.out.println(rs.getInt(8));
				System.out.println(rs.getInt(9));
				System.out.println(rs.getInt(11));
				System.out.println(rs.getString(12));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}  
		
	}

}
