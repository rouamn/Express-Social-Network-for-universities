const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

describe('Task CRUD', () => {
  // Tests unitaires de taskController:
  
  // Test de la méthode createTask
  it('should create a new task', async () => {
    // Créez un objet de tâche pour envoyer dans votre demande POST
    const taskData = {
      title: 'Task Title',
      description: 'Task Description',
      type: 'To_Do',
      deadline: new Date(),
      createdBy: '65ff5b7868c353c055102f66' // Remplacez user_id par un ID utilisateur valide dans votre base de données
    };

    const res = await request(app)
      .post('/task')
      .send(taskData);

    // Assurez-vous que la réponse a le code de statut 201 (Créé avec succès)
    expect(res.statusCode).toEqual(201);

    // Assurez-vous que la réponse contient un ID de tâche
    expect(res.body).toHaveProperty('_id');

    // Vous pouvez ajouter d'autres assertions pour vérifier si les données renvoyées sont correctes
    // Par exemple, vous pouvez vérifier si les données envoyées dans la requête correspondent à celles de la réponse
    expect(res.body.title).toEqual(taskData.title);
    expect(res.body.description).toEqual(taskData.description);
    expect(res.body.type).toEqual(taskData.type);
    expect(res.body.deadline).toEqual(taskData.deadline.toISOString()); // Assurez-vous de convertir la date au format ISO pour la comparaison
    expect(res.body.createdBy).toEqual(taskData.createdBy);
  });

  // Test de la méthode getTasksByUserId
  it('should get tasks by user ID', async () => {
    // Créez un ID utilisateur fictif pour simuler une demande GET
    const userId = '65ff5b7868c353c055102f66';

    const res = await request(app)
      .get(`/task/${userId}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse est un tableau
    expect(Array.isArray(res.body)).toBe(true);

    // Vous pouvez ajouter d'autres assertions pour vérifier si les données renvoyées sont correctes
    // Par exemple, vous pouvez vérifier si chaque tâche a été créée par le bon utilisateur
    res.body.forEach(task => {
      expect(task.createdBy).toEqual(userId);
    });
  });

  // Test de la méthode getTasksByStatus
  it('should get tasks by status', async () => {
    // Créez un ID utilisateur fictif pour simuler une demande GET
    const userId = '65ff5b7868c353c055102f66';

    // Créez un statut de tâche fictif pour simuler une demande GET
    const status = 'To_Do';

    const res = await request(app)
      .get(`/task/status/${status}/${userId}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse est un tableau
    expect(Array.isArray(res.body)).toBe(true);

    // Vous pouvez ajouter d'autres assertions pour vérifier si les données renvoyées sont correctes
    // Par exemple, vous pouvez vérifier si chaque tâche a le statut correct
    res.body.forEach(task => {
      expect(task.type).toEqual(status);
    });
  });

  // Test de la méthode updateTaskStatus
  it('should update task status', async () => {
    // Créez un ID de tâche fictif pour simuler une demande PUT
    const taskId = '660bcc05cb93b01bd4892643';
    // Créez un nouveau statut fictif pour la tâche
    const newStatus = 'IN_PROGRESS';

    const res = await request(app)
      .put(`/task/${taskId}/${newStatus}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse contient la tâche mise à jour avec le nouveau statut
    expect(res.body).toHaveProperty('type', newStatus);
  });

  // Test de la méthode getAllTasks
  it('should get all tasks', async () => {
    // Créez un ID utilisateur fictif pour simuler une demande GET
    const userId = '65ff5b7868c353c055102f66';

    const res = await request(app)
      .get(`/task?userId=${userId}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse est un tableau
    expect(Array.isArray(res.body)).toBe(true);

    // Vous pouvez ajouter d'autres assertions pour vérifier si les données renvoyées sont correctes
    // Par exemple, vous pouvez vérifier si chaque tâche appartient au bon utilisateur
    res.body.forEach(task => {
      expect(task.createdBy).toEqual(userId);
    });
  });

  // Test de la méthode deleteTask
  it('should delete a task', async () => {
    // Créez un ID de tâche fictif pour simuler une demande DELETE
    const taskId = '660bda3da8c2e80aab02c6e0';

    const res = await request(app)
      .delete(`/task/${taskId}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse contient le message de succès de suppression
    expect(res.body).toHaveProperty('message', 'Task deleted successfully');
  });
});

// Tests unitaires de courseController:
describe('Course CRUD', () => {
    // Test de la méthode create a new course
  it('should create a new course', async () => {
    // Créez un objet de cours fictif pour simuler une demande POST
    const newCourse = {
      title: "Nouveau cours",
      description: "Description du nouveau cours",
      file: "chemin/vers/le/fichier",
      image: "chemin/vers/l/image",
      price: 99.99,
      video: "chemin/vers/la/video",
      tags: ["tag1", "tag2"],
    };

    const res = await request(app)
      .post('/course/createcourse')
      .send(newCourse);

    // Assurez-vous que la réponse a le code de statut 201 (Créé)
    expect(res.statusCode).toEqual(201);

    // Assurez-vous que la réponse contient un message de succès et les données du nouveau cours
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Course created successfully');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.title).toEqual(newCourse.title);
  });

  // Test de la méthodeget all courses
  it('should get all courses', async () => {
    const res = await request(app)
      .get('/course/getcourses');

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse est un tableau
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test de la méthode getCourse
  it('should get a course by its ID', async () => {
    // Remplacez 'course_id' par un ID de cours existant dans votre base de données
    const courseId = '660bf87acdd8d6518c3157c1';

    const res = await request(app)
      .get(`/course/getcourse/${courseId}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse est un objet de cours valide
    expect(typeof res.body).toBe('object');
  });

  // Test de la méthode updateCourse
  it('should update a course', async () => {
    // Remplacez 'course_id' par l'ID du cours que vous souhaitez mettre à jour
    const courseId = '660bcf8be0a9d0b1c30b4ca5';

    // Créez un objet avec les nouvelles données du cours
    const updatedCourseData = {
      title: 'Nouveau titre du cours',
      description: 'Nouvelle description du cours',
      // Ajoutez d'autres champs que vous souhaitez mettre à jour
    };

    const res = await request(app)
      .put(`/course/updatecourse/${courseId}`)
      .send(updatedCourseData);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse contient le cours mis à jour avec les nouvelles données
    expect(res.body).toEqual(expect.objectContaining(updatedCourseData));
  });

  // Test de la méthode getCoursesBySearch
  it('should get courses by search query', async () => {
    // Remplacez 'search_query' par la chaîne de recherche que vous souhaitez tester
    const searchQuery = 'devops';

    const res = await request(app)
      .get(`/course/searchcourses?searchQuery=${searchQuery}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse est un tableau d'objets de cours
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test de la méthode getCoursesWithUserId
  it('should get courses by user ID', async () => {
    // Remplacez 'user_id' par l'ID de l'utilisateur pour lequel vous souhaitez récupérer les cours
    const userId = '65ff5b7868c353c055102f66';

    const res = await request(app)
      .get(`/course/getusercourses/${userId}`);

    // Assurez-vous que la réponse a le code de statut 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Assurez-vous que la réponse est un tableau d'objets de cours
    expect(Array.isArray(res.body)).toBe(true);

    // Vous pouvez ajouter d'autres assertions pour vérifier si les données renvoyées sont correctes en fonction de la structure de votre modèle de cours
  });

  
});
