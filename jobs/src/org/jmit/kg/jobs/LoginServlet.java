package org.jmit.kg.jobs;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.jmit.kg.jobs.util.JobUtils;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestDispatcher rd = request.getRequestDispatcher("jsp/login.jsp");
		rd.forward(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Hello World ");
		
		String action = request.getParameter("action");
		String rollno = request.getParameter("txtroll");
		String password = request.getParameter("txtPassword");
		System.out.println("Action called is " + action);
		
		if (rollno == null || "".equals(rollno)) {
			RequestDispatcher rd = request.getRequestDispatcher("jsp/login.jsp");
			rd.forward(request, response);
		}
		
		try {
			Statement stmt = JobUtils.getConnection();  
			ResultSet rs = stmt.executeQuery("select * from users where roll_number = '"+rollno+"' AND password = '"+password+"'");
			
 			if (rs.first()) {
 				
 				String userName = rs.getString(3);
 				String userType = "";
 				if ("1".equalsIgnoreCase(rollno)) {
 					userType = "A";
 				} else {
 					userType = "S";
 				}
 				HttpSession session = request.getSession();
 				session.setAttribute("ROLLNO", rollno);
 				session.setAttribute("USERNAME", userName);
 				session.setAttribute("USERTYPE", userType);
 				session.setAttribute("IS_LOGGED_IN", true);

				RequestDispatcher rd = request.getRequestDispatcher("home");
				rd.forward(request, response);

				System.out.println(rs.getString(5));
			} else {
				RequestDispatcher rd = null;
				request.setAttribute("SUCCESS_MSG", "");
				request.setAttribute("ERROR_MSG", "");
				request.setAttribute("ERROR_MSG", "Wrong Credentials, try again !!!");
				rd = request.getRequestDispatcher("jsp/login.jsp");
				rd.forward(request, response);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}  
		
	}

}
