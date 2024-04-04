Create DataBase Hoteli
Use Hoteli

Create Table Hoteli_Main(
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

--STAFI I PUNETOREVE

Create Table Stafi_Punetoreve(
    Stafi_Punetorev_ID int IDENTITY(1,1) primary key,
    Rruga varchar(50),
    Zip_Code int,
    Orari varchar(50)
);

--STAFI I MIREMBAJTJES
Create Table Stafi_Mirembajtjes(
    Stafi_Mirembajtjes_ID int IDENTITY(1,1) primary key,
    Emri varchar(50),
    Mbiemri varchar(50),
    Nr_Tel int,
    Stafi_P_ID int,
    Constraint FK_Stafi_Punetorev FOREIGN KEY (Stafi_P_ID) REFERENCES Stafi_Punetoreve(Stafi_Punetorev_ID)
);
Create Table Pastrues(
	Pastrues_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Mirembajtjes_ID int,
	Constraint FK_Stafi_Mirembajtjes FOREIGN KEY (Stafi_Mirembajtjes_ID) REFERENCES Stafi_Mirembajtjes(Stafi_Mirembajtjes_ID)
);
Create Table Sherbimi_Dhomes(
	Sherbimi_Dhomes_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Mirembajtjes_ID int FOREIGN KEY REFERENCES Stafi_Mirembajtjes(Stafi_Mirembajtjes_ID)
);

--STAFI I RESTAURANTIT

Create Table Stafi_Restaurantit(
	Stafi_Restaurantit_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Punetorev_ID int FOREIGN KEY REFERENCES Stafi_Punetoreve(Stafi_Punetorev_ID)
);

Create Table Kuzhineri(
	Kuzhineri_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Orari varchar(50),
	Stafi_Restaurantit_ID int FOREIGN KEY REFERENCES Stafi_Restaurantit(Stafi_Restaurantit_ID)
);
Create Table Kamarier(
	Kamarier_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Orari varchar(50),
	Stafi_Restaurantit_ID int FOREIGN KEY REFERENCES Stafi_Restaurantit(Stafi_Restaurantit_ID)
);
Create Table Barist(
	Barist_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Orari varchar(50),
	Stafi_Restaurantit_ID int FOREIGN KEY REFERENCES Stafi_Restaurantit(Stafi_Restaurantit_ID)
);

--STAFI I FITNESIT

Create Table Stafi_Fitnesit(
	Stafi_Fitnesit_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Punetorev_ID int FOREIGN KEY REFERENCES Stafi_Punetoreve(Stafi_Punetorev_ID)
);
Create Table Instruktore(
	Instruktore_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Orari varchar(50),
	Stafi_Fitnesit_ID int FOREIGN KEY REFERENCES Stafi_Fitnesit(Stafi_Fitnesit_ID)
);
Create Table Nutricion(
	Nutricion_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Orari varchar(50),
	Stafi_Fitnesit_ID int FOREIGN KEY REFERENCES Stafi_Fitnesit(Stafi_Fitnesit_ID)
);

--STAFI I CAFFE

Create Table Stafi_Kaffe(
	Stafi_Kaffe_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Punetorev_ID int FOREIGN KEY REFERENCES Stafi_Punetoreve(Stafi_Punetorev_ID)
);
Create Table Barist_Kaffe(
	Barist_Kaffe_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Kaffe_ID int FOREIGN KEY REFERENCES Stafi_Kaffe(Stafi_Kaffe_ID)
);
Create Table Kamarier_Kaffe(
	Kamarier_Kaffe_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Kaffe_ID int FOREIGN KEY REFERENCES Stafi_Kaffe(Stafi_Kaffe_ID)
);

--STAFI I HOTELIT

Create Table Stafi_Hotelit(
	Stafi_Hotelit_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Punetorev_ID int FOREIGN KEY REFERENCES Stafi_Punetoreve(Stafi_Punetorev_ID)
);
Create Table Recepcionist(
	Recepcionist_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Hotelit_ID int FOREIGN KEY REFERENCES Stafi_Hotelit(Stafi_Hotelit_ID)
);
Create Table Kordinator_Aktivitetesh(
	Kordinator_Aktivitetesh_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Hotelit_ID int FOREIGN KEY REFERENCES Stafi_Hotelit(Stafi_Hotelit_ID)
);

--STAFI I SPA

Create Table Stafi_Spa(
	Stafi_Spa_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Punetorev_ID int FOREIGN KEY REFERENCES Stafi_Punetoreve(Stafi_Punetorev_ID)
);
Create Table Masazher(
	Masazher_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Spa_ID int FOREIGN KEY REFERENCES Stafi_Spa(Stafi_Spa_ID)
);
Create Table Terapist_ID(
	Terapist_ID_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Spa_ID int FOREIGN KEY REFERENCES Stafi_Spa(Stafi_Spa_ID)
);
Create Table Estetik(
	Estetik_ID_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Spa_ID int FOREIGN KEY REFERENCES Stafi_Spa(Stafi_Spa_ID)
);

--STAFI I TEKNIK

Create Table Stafi_Teknik(
	Stafi_Teknik_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Punetorev_ID int FOREIGN KEY REFERENCES Stafi_Punetoreve(Stafi_Punetorev_ID)
);
Create Table Mjeshter(
	Mjeshter_ID int IDENTITY(1,1) primary key,
	Emri varchar(50),
	Mbiemri varchar(50),
	Nr_Tel int,
	Stafi_Teknik_ID int FOREIGN KEY REFERENCES Stafi_Teknik(Stafi_Teknik_ID)
);
