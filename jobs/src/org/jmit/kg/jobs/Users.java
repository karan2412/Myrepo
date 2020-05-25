package org.jmit.kg.jobs;

import java.io.IOException;
import java.io.InputStream;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.jmit.kg.jobs.beans.User;
import org.jmit.kg.jobs.util.JobUtils;
import org.jmit.kg.jobs.util.ValueUtil;

@WebServlet("/users")
@MultipartConfig
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
			user.setGrad(rs.getString(8));
			user.setPostgrad(rs.getString(9));
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
		Integer rollno = Integer.valueOf(request.getParameter("ROLLNO"));
		String grad = request.getParameter("txtgrad");
		String postgrad = request.getParameter("txtpgrad");
		Double ssc = Double.valueOf(request.getParameter("txtMarksSsc"));
		Double hsc = Double.valueOf(request.getParameter("txtMarksHsc"));
		Double gradm = Double.valueOf(request.getParameter("txtMarksgrad"));
		Double postgradm = Double.valueOf(request.getParameter("txtMarkspgrad"));
		Integer backlogs = Integer.valueOf(request.getParameter("txtback"));

		InputStream is10 = null;
		InputStream is12 = null;
		InputStream isGrad = null;
		InputStream isPostGrad = null;
		
		List<Part> fileParts = (List<Part>) request.getParts();
		for (Part f : fileParts) {
			try {
				if (f.getName().equals("10file")) {
					is10 = f.getInputStream();
				} else if (f.getName().equals("12file")) {
					is12 = f.getInputStream();
				} else if (f.getName().equals("gradfile")) {
					isGrad = f.getInputStream();
				} else if (f.getName().equals("pgradfile")) {
					isPostGrad = f.getInputStream();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}


		String query = "UPDATE USERS SET  password = ?, mobile = ?, address = ?, email = ?, grad = ?,  name = ?,"
				+ "ssc_marks = ?, hsc_marks = ?, postgrad = ?, backlogs = ?, marks_grad = ?, marks_postgrad = ?,"
				+ "file_10 = ?, file_12 = ?, file_grad = ?, file_postgrad = ? WHERE roll_number = ?";
		
		PreparedStatement stmt = JobUtils.getPSConnection(query);
		stmt.setString(1, password);
		stmt.setString(2, mobile);
		stmt.setString(3, address);
		stmt.setString(4, email);
		stmt.setString(5, grad);
		stmt.setString(6, name);
		stmt.setDouble(7, ssc);
		stmt.setDouble(8, hsc);
		stmt.setString(9, postgrad);
		stmt.setInt(10, backlogs);
		stmt.setDouble(11, gradm);
		stmt.setDouble(12, postgradm);
		stmt.setBlob(13, is10);
		stmt.setBlob(14, is12);
		stmt.setBlob(15, isGrad);
		stmt.setBlob(16, isPostGrad);
		stmt.setInt(17, rollno);

		Integer updated = stmt.executeUpdate();
		
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
