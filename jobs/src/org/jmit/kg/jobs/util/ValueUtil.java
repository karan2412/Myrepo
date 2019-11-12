package org.jmit.kg.jobs.util;

import java.util.List;


/**
 * @author sarthak
 * @remarks Utility Class for getting the right values
 */
public class ValueUtil {
    
    /**
     * @author sarthak
     * @param obj
     * @return String
     */
    public static String getStringValue(String obj) {
        String str = "";
        try {
            str = (obj != null && !"".equals(obj) && !"null".equalsIgnoreCase(obj)) ? obj : "";
        } catch (Exception e) {
            return null;
        }
        
        return str;
    }
    
    /**
     * @author sarthak
     * @param obj
     * @return String
     */
    public static String getStringValueNotNull(String obj) {
        String str = "";
        try {
            str = (obj != null && !"".equals(obj) && !"null".equalsIgnoreCase(obj)) ? obj : "";
        } catch (Exception e) {}
        
        return str;
    }

    public static String getStringValueNotNull(Object obj) {
    	String s = (String) obj;
    	return getStringValueNotNull(s);
    }

    
    /**
     * @author sarthak
     * @param str
     * @return Long
     */
    public static Long getLongValue(String str) {
        Long obj = 0L;
        try {
            obj = (str != null && !"".equals(str)) ? Long.parseLong(str) : 0;
    
            if (obj == 0) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
        return obj;
    }

    /**
     * @author sarthak
     * @param str
     * @return Long / 0
     */
    public static Long getLongValueNotNull(String str) {
        Long obj = 0L;
        try {
            obj = (str != null && !"".equals(str)) ? Long.parseLong(str) : 0;
        } catch (Exception e) {
            return 0l;
        }
        return obj;
    }
  
    /**
     * @author sarthak
     * @param str
     * @return Double
     */
    public static Double getDoubleValue(String str) {
        Double obj = 0.0;
        try {
            obj = (str != null && !"".equals(str)) ? Double.parseDouble(str) : 0;
    
            if (obj == 0) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
        return obj;
    }

    /**
     * @author sarthak
     * @param str
     * @return Double / 0
     */
    public static Double getDoubleValueNotNull(String str) {
        Double obj = 0.0;
        try {
            obj = (str != null && !"".equals(str)) ? Double.parseDouble(str) : 0;
        } catch (Exception e) {
            return 0D;
        }
        return obj;
    }
  
    /**
     * @author sarthak
     * @param str
     * @return Integer
     */
    public static Integer getIntegerValue(String str) {
        Integer obj = 0;
        try {
            obj = (str != null && !"".equals(str)) ? Integer.parseInt(str) : 0;
        } catch (Exception e) {
            return null;
        }
        return obj;
    }

    /**
     * @author sarthak
     * @param str
     * @return Integer / 0
     */
    public static Integer getIntegerValueNotNull(String str) {
        Integer obj = 0;
        try {
            obj = (str != null && !"".equals(str)) ? Integer.parseInt(str) : 0;
        } catch (Exception e) {
            return 0;
        }
        return obj;
    }
  
    /**
     * @author sarthak
     * @param str
     * @return Boolean
     */
    public static boolean isValidString(String str) {
        boolean isValid = true;
    //        Pattern pattern = Pattern.compile("[\"']");
    //        Matcher patternMatcher = pattern.matcher(str);
    //
    //        if (patternMatcher.matches()) {
    //          isValid = false;
    //        }
  
        if (str.indexOf("'") != -1 || str.indexOf("\"") != -1) {
            isValid = false;
        }
        
        return isValid;
    }
    
    /**
     * @author sarthak
     * @param lst
     * @return Delimited String from the List
     */
    public static String getStringFromList(List lst) {
    	StringBuffer sb = new StringBuffer();
    	try {
    		if (lst != null && !lst.isEmpty()) {
	    		for (int i = 0; i < lst.size(); i++) {
	    			sb.append(lst.get(i)+"@ROW@");
	    		}
    		}
    	} catch(Exception e) {
    	}
    	
    	return sb.toString();
    }

    public static Boolean getBooleanValue(Object obj) {
    	if (obj == null) {
    		return false;
    	}
    	return (Boolean) obj;
    }

    /**
     * @author sarthak
     * @param str
     * @return Boolean equivalent of the String
     */
    public static Boolean getBooleanValue(String str) {
    	Boolean flag = false;
    	
    	try {
    		flag = str != null && !"".equals(str) ? Boolean.parseBoolean(str) : false;
    	} catch(Exception e) {
    	}
    	
    	return flag;
    }
    
    /**
     * @author sarthak
     * @param val
     * @return Boolean equivalent of the Number
     */
    public static Boolean getBooleanValue(Integer val) {
    	Boolean flag = false;
    	
    	try {
    		flag = (val != null && val != 0) ? true : false;
    	} catch(Exception e) {
    	}
    	
    	return flag;
    }

    public static int safeLongToInt(long l) {
        if (l < Integer.MIN_VALUE || l > Integer.MAX_VALUE) {
            throw new IllegalArgumentException
                (l + " cannot be cast to int without changing its value.");
        }
        return (int) l;
    }
}
