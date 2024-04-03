Create DataBase Hoteli
Use Hoteli

Create Table Hoteli(
	Hoteli_ID int IDENTITY(1,1) primary key,
	Emri_Hotelit varchar(50),
	Rruga varchar(100),
	Zip_Code int ,
	Nr_Tel int
);
Create Table Klienti(
	Klienti_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Email varchar(255),
	Nr_Tel int
);
Create Table Restaurant(
	Restauarant int IDENTITY(1,1) primary key,
	Emri_Restaurantit varchar(50),
	Tarasa varchar(50),
	Mbrenda varchar(50)
);
Create Table Caffe(
	Caffe_ID int IDENTITY(1,1) primary key,
	Emri_Caffes varchar(50),
	Tarasa varchar(50),
	Mbrenda varchar(50)
);
Create Table Spa(
	Spa_ID int IDENTITY (1,1),
	Sherbimi varchar(50),
	Nr_Tel int,
	Orari varchar(50)
);
Create Table Pool(
	Pool_ID int IDENTITY(1,1) primary key,
	Orari varchar(50)
)
Create Table Room(
	Room_ID int IDENTITY(1,1) primary key,
	Lloji varchar(50),
	Cmimi int,
	Pamja varchar(50),
	Numri int,
	Shtrati int
);
Create Table Fitnesi(
	Fitnes_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Nr_Tel int,
	Orari varchar(50)
);
Create Table Activities(
	Acitivities_ID int IDENTITY(1,1) primary key,
	Orari varchar(50),
	Data date
);