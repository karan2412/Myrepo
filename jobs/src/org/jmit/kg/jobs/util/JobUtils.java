package org.jmit.kg.jobs.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JobUtils {

	public static Statement getConnection() throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.cj.jdbc.Driver");  
		Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/jmit","karan","karan");  
		Statement stmt=con.createStatement();
		return stmt;
	}


}
