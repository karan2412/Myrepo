package org.jmit.kg.jobs;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jmit.kg.jobs.beans.User;
import org.jmit.kg.jobs.util.JobUtils;

@WebServlet("/users")
public class Users extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			String mode = request.getParameter("MODE");
			System.out.println("MODE : " + mode);

			if ("LIST".equals(mode)) {
				getListOfUsers(request, response);
			} else if ("ADD_USER".equals(mode)) {
				
			}
 			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}  
		
	}

	private void getListOfUsers(HttpServletRequest request,
			HttpServletResponse response) throws ClassNotFoundException,
			SQLException, ServletException, IOException {
		Statement stmt = JobUtils.getConnection();  
		ResultSet rs = stmt.executeQuery("select * from users");
		List<User> lstUsers = new ArrayList<>();
		
		while (rs.next()) {
			User user = new User();
			
			user.setUserId(rs.getInt(1));
			user.setPassword(rs.getString(2));
			user.setPhone(rs.getString(3));
			user.setAddress(rs.getString(4));
			user.setName(rs.getString(5));
			user.setStream(rs.getString(6));
			user.setBranch(rs.getString(7));
			user.setMarksSsc(rs.getInt(8));
			user.setMarksHsc(rs.getInt(9));
			user.setMarksGrad(rs.getInt(10));
			user.setMarksPostGrad(rs.getInt(11));
			user.setEmail(rs.getString(12));
			
			lstUsers.add(user);
		}
		
		request.setAttribute("lstUsers", lstUsers);
		
		RequestDispatcher rd=request.getRequestDispatcher("jsp/users.jsp");
		rd.forward(request, response);
	}

}
