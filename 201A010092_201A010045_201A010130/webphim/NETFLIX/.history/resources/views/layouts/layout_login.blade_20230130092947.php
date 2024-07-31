<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<!------ Include the above in your HEAD tag ---------->

<!DOCTYPE html>
<html>
<head>	
	<title>Login</title>
	<script src="jQuery/jquery-3.1.1.min.js" type="text/javascript"></script>
	<style type="text/css">

body{
			background-color: black;
		}

		#box{
			height: 2px;
			width: 1px;
			padding: 5px;
			background-color: #66f9ff;
			border-radius: 10px;
			line-height:90px;
			box-shadow: 0 0 15px #66ffff;
		}
		#circle{
			height: 100%;
			width: 75%;
			border-radius: 400px;
			background-color: none;
			padding-bottom: 30px;
			border : 4px solid #00cccc;
		}
		#in{
			width: 90%;
			height: 50px;
			border-radius: 10px;
			padding: 8px;
			border : 4px solid #00cccc;
			background-color: #333333;
			color: white;
		}
		#in:focus{
			border:6px solid #00cccc;
		}
		#inBtn{
			width: 90%;
			height: 50px;
			border-radius: 10px;
			line-height:10px;
			border : 4px solid #00cccc;
			background-color: #333333;
			color:white;
			cursor: pointer;
		}
		#copy{
			color: #00cccc;
			text-align: center;
			font-style: italic;
		}
		footer{
      position:fixed;		    
      bottom:0px;
      left:0px;
      right:0px;
      margin-bottom:0px;
		}
		hr{
			color: #00cccc;
		}
  </style>

</head>
<body background="https://farm4.staticflickr.com/3940/32677535044_606bd74352_c.jpg" style="background-repeat:no-repeat;background-size:cover;" >
	<br>
	<hr>
	<h1 align="center" style="color:#00cccc;">Login Form</h1>
	<hr>
	<br>
	<form>
		<center>
			<div id="circle">
				<h1 id="blinking" style="color: #00cccc;">Please Login Here</h1>
				<div id="box">
					<input type="text" name="uname" id="in" placeholder="Username"><br>
					<input type="password" name="pwrd" placeholder="Password" id="in">
					<input type="button" name="login" value="Login" id="inBtn" style="color:white;">
				</div>
			</div>
		</center>
		
	</form>

	<br><br><br><br>
	<!-- <hr>
		<p id="footer">Misfar ©</p>
	<hr> -->
	<footer>
		<hr>
			<p id="copy">Ayaal Shahim ©</p>
		<hr>
	</footer>
</body>
</html>
