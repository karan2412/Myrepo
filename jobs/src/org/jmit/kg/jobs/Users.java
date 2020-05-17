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
import javax.servlet.http.HttpSession;

import org.jmit.kg.jobs.beans.User;
import org.jmit.kg.jobs.util.JobUtils;
import org.jmit.kg.jobs.util.ValueUtil;

@WebServlet("/users")
public class Users extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String mode = request.getParameter("MODE");
		System.out.println("MODE : " + mode);
		try {
			if ("ADD_USER".equals(mode)) {
				RequestDispatcher rd=request.getRequestDispatcher("jsp/users.jsp");
				rd.forward(request, response);
			} else if ("ADD_DATA".equals(mode)) {
				addData(request, response);
			} else  if (!ValueUtil.getBooleanValue(session.getAttribute("IS_LOGGED_IN"))) {
				request.setAttribute("ERROR_MSG", "Please log in with your credentials !!!");
				RequestDispatcher rd=request.getRequestDispatcher("login");
				rd.forward(request, response);
			} else {
				if ("LIST".equals(mode)) {
					getListOfUsers(request, response);
				} else if ("UPDATE_USER".equals(mode)) {
					String rollNo = request.getParameter("ROLLNO");
					User user = findUser(rollNo);
					if (user == null) {
						request.setAttribute("ERROR_MSG", "User not found !!!");
						request.setAttribute("SUCCESS_MSG", "");
					}
					request.setAttribute("user", user);
					RequestDispatcher rd=request.getRequestDispatcher("jsp/users.jsp");
					rd.forward(request, response);
				} else if ("UPDATE_DATA".equals(mode)) {
					updateData(request, response);
				}
			}	 			
		} catch (SQLException | ClassNotFoundException e) {
			e.printStackTrace();
		}  
	}

	public User findUser(String rollno) throws ClassNotFoundException, SQLException {
		User user = null;
		Statement stmt = JobUtils.getConnection();
		ResultSet rs = stmt.executeQuery("SELECT * FROM USERS WHERE roll_number = " + rollno);
		if (rs.first()) {
			user = new User();
			
			user.setRollno(rs.getInt(1));
			user.setPassword(rs.getString(2));
			user.setName(rs.getString(3));
			user.setAddress(rs.getString(4));
			user.setMobile(rs.getString(5));
			user.setSsc(rs.getDouble(6));
			user.setHsc(rs.getDouble(7));
			user. setGrad(rs.getString(8));
			user. setPostgrad(rs.getString(9));
			user.setGradm(rs.getDouble(10));
			user.setPostgradm(rs.getDouble(11));
			user.setEmail(rs.getString(12));
			user.setBacklogs(rs.getInt(13));
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
		String name = request.getParameter("txtFName");
		String password = request.getParameter("txtUserPassword");
		String address = request.getParameter("txtAddress");
		String mobile = request.getParameter("txtMobile");
		String email = request.getParameter("txtEmail");
		String rollno = request.getParameter("ROLLNO");
		String grad = request.getParameter("txtgrad");
		String postgrad = request.getParameter("txtpgrad");
		String ssc = request.getParameter("txtMarksSsc");
		String hsc = request.getParameter("txtMarksHsc");
		String gradm = request.getParameter("txtMarksgrad");
		String postgradm = request.getParameter("txtMarkspgrad");
		String backlogs = request.getParameter("txtback");

		Statement stmt = JobUtils.getConnection();  
		String query = "UPDATE USERS SET  password = '"+password+"', mobile = '"+mobile+"', address = '"+address+"', email = '"+email+"', "
				+ "grad = '"+grad+"',  name = '"+name+"',"
				+ "ssc_marks = "+ssc+", hsc_marks = "+hsc+", postgrad = "+postgrad+", backlogs = "+backlogs+", marks_grad = "+gradm+", marks_postgrad = " + postgradm  + " WHERE roll_number = " + "'"+rollno+"'";
		Integer updated = stmt.executeUpdate(query);
		
		RequestDispatcher rd = null;
		request.setAttribute("SUCCESS_MSG", "");
		request.setAttribute("ERROR_MSG", "");
		if (updated > 0) {
			request.setAttribute("SUCCESS_MSG", "Student Info Updated Successfully !!!");
			rd = request.getRequestDispatcher("users?MODE=UPDATE_USER&ROLLNO="+rollno);
		} else {
			request.setAttribute("ERROR_MSG", "Unable to update student Info !! Try after sometime !!");
			rd = request.getRequestDispatcher("jsp/users.jsp");
		}
		rd.forward(request, response);
		
	}

	private static void addData(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, ServletException, IOException {
		
		String name = request.getParameter("txtFName");
		String password = request.getParameter("txtUserPassword");
		String address = request.getParameter("txtAddress");
		String mobile = request.getParameter("txtMobile");
		String email = request.getParameter("txtEmail");
		String rollno = request.getParameter("txtroll");
		String grad = request.getParameter("txtgrad");
		String postgrad = request.getParameter("txtpgrad");
		String ssc = request.getParameter("txtMarksSsc");
		String hsc = request.getParameter("txtMarksHsc");
		String gradm = request.getParameter("txtMarksgrad");
		String postgradm = request.getParameter("txtMarkspgrad");
		String backlogs = request.getParameter("txtback");

		Statement stmt = JobUtils.getConnection();  
		//(user_id, password, phone, address, name, stream, branch, marks_ssc, marks_hsc, marks_grad, marks_postgrad, email)
		Integer inserted = stmt.executeUpdate("INSERT INTO USERS  "
				+ "VALUES ("+rollno+", '"+password+"', '"+name+"', '"+address+"', '"+mobile+"', '"+ssc+"', "
						+ "'"+hsc+"', '"+grad+"', '"+postgrad+"', '"+gradm+"', '"+postgradm+"', '"+email+"', '"+backlogs+"')");
		
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
			
			user.setRollno(rs.getInt(1));
			user.setPassword(rs.getString(2));
			user.setName(rs.getString(3));
			user.setAddress(rs.getString(4));
			user.setMobile(rs.getString(5));
			user.setSsc(rs.getDouble(6));
			user.setHsc(rs.getDouble(7));
			user. setGrad(rs.getString(8));
			user. setPostgrad(rs.getString(9));
			user.setGradm(rs.getDouble(10));
			user.setPostgradm(rs.getDouble(11));
			user.setEmail(rs.getString(12));
			user.setBacklogs(rs.getInt(13));
			
			lstUsers.add(user);
		}
		
		request.setAttribute("lstUsers", lstUsers);
		
		RequestDispatcher rd=request.getRequestDispatcher("jsp/users.jsp");
		rd.forward(request, response);
	}

}
