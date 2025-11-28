# 🚀 Skill Connect  
A full-stack web application where users can connect, offer work, chat in real-time, and collaborate.  
Built using **Django REST Framework**, **React (Vite)**, **Django Channels**, **WebSockets**, and fully **Dockerized**.

---

## 📌 Features

### 🔐 Authentication & Users  
- JWT Authentication  
- Login / Signup  
- Cookies to store refresh token 

### 💼 Work / Skill System  
- Users can offer work or services  
- Add skills     

### 💬 Real-Time Chat  
- Django Channels + Redis  
- WebSocket real-time messaging  
- Live interactive chat rooms  
- One-to-one chat  

### 👥 Friends System  
- Add friends  
- View request list 
- View friend list  
- Chat only with accepted friends 
- Search for friends 

### 📁 Media & Assets  
- Image uploads stored in `media/uploads/images/`  
- Docker volume mounted for persistence  

### 🖥 Frontend  
- React + Vite  
- Tailwind CSS  
- Toast notifications (react-hot-toast)  
- WebSocket client  
- Clean modern UI  

### 🐳 Fully Dockerized  
- Backend container  
- Frontend container  
- Redis container  

---

## 🏗️ Tech Stack

### Backend
- Python 3.12  
- Django  
- Django REST Framework  
- Django Channels  
- Redis  
- Daphne (ASGI)  
- SQLite / PostgreSQL  
- Docker  

### Frontend
- React + Vite  
- Tailwind CSS  
- Axios  
- Toast (react-hot-toast)  
- WebSocket API  
- Docker  

---

## 📁 Folder Structure  
Skill_Connect/  
│── back/ # Backend  
│ ├── manage.py  
│ ├── backend/ # Django project (settings, urls, asgi)  
│ ├── SkillConnect/ # User app    
│ ├── chat/ # Chat app  
│ ├── friends/ # Friends logic  
│ ├── work/ # Work posting logic  
│ ├── media/  
│ │ └── uploads/images/ # Uploaded images  
│ ├── Dockerfile  
│ └── requirements.txt  
│
│── front/  
│ └── frontend/ # React Vite frontend  
│ ├── src/  
│ ├── Dockerfile  
│ └── package.json  
│  
└── docker-compose.yml  


---

## 🔧 Environment Variables

### Backend (`back/.env`)
SECRET_KEY=your_secret_key    
ALLOWED_HOSTS=*
<hr>

### Frontend (`front/frontend/.env`)  
Nothing to do here😊😊

<hr>

## Insatallation & Setup
### Clone the Repository    
```bash
git clone https://github.com/yogeswar2006/Skill-Connect.git
```
---

## 🐳 Docker Setup (Full Stack)

Starts everything:

```bash
docker compose up --build  
```  

## URL Routing

#### Backend URL
```bash
  http://localhost:8000
```

#### Frontend URL
```bash
  http://localhost:5173
```

## Without Docker
#### Backend (Without Docker)

```bash
cd back  
python -m venv env  # creates an environment  
pip install -r requirements.txt  # install all dependencies required  
python manage.py migrate # make migrations  
daphne -b 0.0.0.0 -p 8000 backend.asgi:application # Run asgi server  
```

## Frontend (Without Docker)  
```bash
cd front/frontend  
npm install # install dependencies  
npm run dev # starts server  
```

### visit above URLS  
<hr>




# DEMO SCREENSHOTS  

## Home  

<img  width="1909" height="956" alt="Image" src="https://github.com/user-attachments/assets/d96dc333-9e6b-4ab1-ab2a-c1c4b761e1ff" />

## Register  
<img width="1919" height="953" alt="Image" src="https://github.com/user-attachments/assets/f0ff2582-28fe-4658-934c-f21ebec7160d" />

## Login  
<img width="1919" height="953" alt="Image" src="https://github.com/user-attachments/assets/f95ddb6d-11d9-45ad-b7f7-142cbad3c654" />

## Dashboard  
<img width="1901" height="950" alt="Image" src="https://github.com/user-attachments/assets/530b5cf0-40c4-4976-b96f-781abdc970f6" />

## Add Skill  
<img width="1916" height="953" alt="Image" src="https://github.com/user-attachments/assets/a74bf881-515e-4f8d-8905-59e93c632791" />

## Add Work Offer  
<img width="1913" height="947" alt="Image" src="https://github.com/user-attachments/assets/f5940026-4c32-4e6c-834a-ca92136c6ff0" />

## Profile-1    
<img width="1911" height="955" alt="Image" src="https://github.com/user-attachments/assets/2da38741-656b-4666-a402-b913031b1747" />

## Profile-2    
<img width="1908" height="954" alt="Image" src="https://github.com/user-attachments/assets/cb5b6ddd-c5d7-458f-8f4d-9e3d2bb1f4c7" />

## Code snippet  
<img width="1912" height="952" alt="Image" src="https://github.com/user-attachments/assets/9f9ed266-974d-48e7-b6ee-ac3c4cc18918" />

## ChatPage  
<img width="1919" height="955" alt="Image" src="https://github.com/user-attachments/assets/7f7f92ad-a4c6-4bc3-9ff7-9ce51e219b91" />



------------------------------------------❤️THE END❤️--------------------------------------











