package org.jmit.kg.jobs;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Enumeration;
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

	private static final long serialVersionUID = 1L;

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
				RequestDispatcher rd=request.getRequestDispatcher("jsp/users.jsp");
				rd.forward(request, response);
			} else if ("UPDATE_USER".equals(mode)) {
				String userId = request.getParameter("USERID");
				User user = findUser(userId);
				if (user == null) {
					request.setAttribute("ERROR_MSG", "User not found !!!");
					request.setAttribute("SUCCESS_MSG", "");
				}
				request.setAttribute("user", user);
				RequestDispatcher rd=request.getRequestDispatcher("jsp/users.jsp");
				rd.forward(request, response);
			} else if ("ADD_DATA".equals(mode)) {
				addData(request, response);
			} else if ("UPDATE_DATA".equals(mode)) {
				updateData(request, response);
			}
 			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}  
		
	}

	private User findUser(String userId) throws ClassNotFoundException, SQLException {
		User user = null;
		Statement stmt = JobUtils.getConnection();
		ResultSet rs = stmt.executeQuery("SELECT * FROM USERS WHERE USER_ID = " + userId);
		if (rs.first()) {
			user = new User();
			
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
		}
		
		return user;
	}

	public static void printRequestParams(HttpServletRequest request) {
		Enumeration<String> e = request.getParameterNames();
		while (e.hasMoreElements()) {
			String param = e.nextElement();
			System.out.println(param + " > " + request.getParameterValues(param));
		}
	}

	private void updateData(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException {
		String userId = request.getParameter("USERID");
		String name = request.getParameter("txtName");
		String password = request.getParameter("txtUserPassword");
		String address = request.getParameter("txtAddress");
		String mobile = request.getParameter("txtMobile");
		String email = request.getParameter("txtEmail");
		String stream = request.getParameter("txtStream");
		String branch = request.getParameter("txtBranch");
		String ssc = request.getParameter("txtMarksSsc");
		String hsc = request.getParameter("txtMarksHsc");
		String grad = request.getParameter("txtMarksGrad");
		String postGrad = request.getParameter("txtMarksPostGrad");

		Statement stmt = JobUtils.getConnection();  
		
		Integer updated = stmt.executeUpdate("UPDATE USERS SET  password = '"+password+"', phone = '"+mobile+"', address = '"+address+"', email = '"+email+"', "
				+ "stream = '"+stream+"', branch = '"+branch+"', name = '"+name+"',"
				+ "marks_ssc = "+ssc+", marks_hsc = "+hsc+", marks_grad = "+grad+", marks_postgrad = " + postGrad + " WHERE USER_ID = " + userId);
		
		RequestDispatcher rd = null;
		request.setAttribute("SUCCESS_MSG", "");
		request.setAttribute("ERROR_MSG", "");
		if (updated > 0) {
			request.setAttribute("SUCCESS_MSG", "Student Info Updated Successfully !!!");
			rd = request.getRequestDispatcher("users?MODE=UPDATE_USER&USERID="+userId);
		} else {
			request.setAttribute("ERROR_MSG", "Unable to update student Info !! Try after sometime !!");
			rd = request.getRequestDispatcher("jsp/users.jsp");
		}
		rd.forward(request, response);
		
	}

	private static void addData(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException {
		
		String userId = request.getParameter("txtUserId");
		String name = request.getParameter("txtName");
		String password = request.getParameter("txtUserPassword");
		String address = request.getParameter("txtAddress");
		String mobile = request.getParameter("txtMobile");
		String email = request.getParameter("txtEmail");
		String stream = request.getParameter("txtStream");
		String branch = request.getParameter("txtBranch");
		String ssc = request.getParameter("txtMarksSsc");
		String hsc = request.getParameter("txtMarksHsc");
		String grad = request.getParameter("txtMarksGrad");
		String postGrad = request.getParameter("txtMarksPostGrad");

		Statement stmt = JobUtils.getConnection();  
		//(user_id, password, phone, address, name, stream, branch, marks_ssc, marks_hsc, marks_grad, marks_postgrad, email)
		Integer inserted = stmt.executeUpdate("INSERT INTO USERS  "
				+ "VALUES ('"+userId+"', '"+password+"', '"+mobile+"', '"+address+"', '"+name+"', '"+stream+"', "
						+ "'"+branch+"', "+ssc+", "+hsc+", "+grad+", "+postGrad+", '"+email+"')");
		
		RequestDispatcher rd = null;
		request.setAttribute("SUCCESS_MSG", "");
		request.setAttribute("ERROR_MSG", "");
		if (inserted > 0) {
			request.setAttribute("SUCCESS_MSG", "Student Registered Successfully !!!");
			rd = request.getRequestDispatcher("jsp/users.jsp");
		} else {
			request.setAttribute("ERROR_MSG", "Unable to Register !! Try after sometime !!");
			rd = request.getRequestDispatcher("jsp/users.jsp");
		}
		rd.forward(request, response);
		
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
