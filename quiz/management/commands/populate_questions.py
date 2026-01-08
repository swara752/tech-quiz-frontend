from django.core.management.base import BaseCommand
from quiz.models import Question


class Command(BaseCommand):
    help = 'Populate database with quiz questions'

    def handle(self, *args, **kwargs):
        Question.objects.all().delete()
        
        questions_data = [
            {"round": 1, "domain": "AI/ML", "text": "What is Machine Learning?", "options": ["Programming with rules", "Learning from data without explicit programming", "Writing AI hardware", "Using databases only"], "correct": 1},
            {"round": 1, "domain": "AI/ML", "text": "Which algorithm is used for classification problems?", "options": ["Linear Regression", "K-Means", "Decision Tree", "Apriori"], "correct": 2},
            {"round": 1, "domain": "AI/ML", "text": "What is training data?", "options": ["Data used after prediction", "Data used to test accuracy", "Data used to teach the model", "Random unused data"], "correct": 2},
            {"round": 1, "domain": "AI/ML", "text": "Which language is most popular for ML?", "options": ["C", "Java", "Python", "HTML"], "correct": 2},
            {"round": 1, "domain": "Cybersecurity", "text": "What does 'phishing' mean?", "options": ["Fishing online", "Stealing data using fake messages", "Breaking servers", "Encrypting files"], "correct": 1},
            {"round": 1, "domain": "Cybersecurity", "text": "What is a firewall?", "options": ["Virus", "Security camera", "Network security device", "Password manager"], "correct": 2},
            {"round": 1, "domain": "Cybersecurity", "text": "Which one is a strong password?", "options": ["123456", "password", "Abc@1234", "qwerty"], "correct": 2},
            {"round": 1, "domain": "Cybersecurity", "text": "What does HyperText Transfer Protocol Secure indicate?", "options": ["Fast website", "Free website", "Secure website", "Government website"], "correct": 2},
            {"round": 1, "domain": "Cloud", "text": "What is cloud computing?", "options": ["Using weather data", "Storing data on local disk", "Using internet-based servers", "Writing cloud software"], "correct": 2},
            {"round": 1, "domain": "Cloud", "text": "Which is a cloud service provider?", "options": ["Oracle", "AWS", "Linux", "MySQL"], "correct": 1},
            {"round": 1, "domain": "Cloud", "text": "What does SaaS stand for?", "options": ["Software as a Service", "System as a Service", "Storage as a Software", "Server as a Software"], "correct": 0},
            {"round": 1, "domain": "Cloud", "text": "Which cloud model offers virtual machines?", "options": ["SaaS", "PaaS", "IaaS", "DBaaS"], "correct": 2},
            {"round": 1, "domain": "Data Science", "text": "What is data science mainly about?", "options": ["Writing code only", "Analyzing data for insights", "Designing websites", "Network security"], "correct": 1},
            {"round": 1, "domain": "Data Science", "text": "Which library is used for data analysis in Python?", "options": ["NumPy", "Pandas", "Matplotlib", "All of the above"], "correct": 3},
            {"round": 1, "domain": "Data Science", "text": "What is data visualization?", "options": ["Data storage", "Data encryption", "Showing data graphically", "Deleting data"], "correct": 2},
            {"round": 1, "domain": "Data Science", "text": "Which tool is commonly used for data analysis?", "options": ["Excel", "MS Paint", "Notepad", "Calculator"], "correct": 0},
            {"round": 1, "domain": "Big Data", "text": "What does Big Data mean?", "options": ["Small datasets", "Structured data only", "Very large and complex data", "Backup data"], "correct": 2},
            {"round": 1, "domain": "Big Data", "text": "Which is a Big Data framework?", "options": ["Hadoop", "Python", "Windows", "Oracle"], "correct": 0},
            {"round": 1, "domain": "Big Data", "text": "What are the 3 V's of Big Data?", "options": ["Value, Vision, Volume", "Volume, Velocity, Variety", "Volume, Version, View", "Velocity, Value, View"], "correct": 1},
            {"round": 1, "domain": "Big Data", "text": "Which company heavily uses Big Data?", "options": ["Netflix", "Small shops", "Offline stores", "Calculators"], "correct": 0},
            
            {"round": 2, "domain": "AI/ML", "text": "In machine learning, models sometimes perform very well on training data but poorly on new data. Which technique is commonly used to reduce this overfitting problem?", "options": ["Increasing number of epochs", "Adding more features", "Regularization", "Increasing learning rate"], "correct": 2},
            {"round": 2, "domain": "AI/ML", "text": "Some machine learning algorithms classify new data points by comparing them with nearby known data points. Which algorithm works based on the concept of 'nearest neighbors'?", "options": ["Naive Bayes", "K-N-N", "Decision Tree", "Logistic Regression"], "correct": 1},
            {"round": 2, "domain": "Cybersecurity", "text": "A cyberattack floods a server with an extremely large amount of traffic from multiple sources. What is the primary goal of this type of Distributed Denial-of-Service (DDoS) attack?", "options": ["Steal sensitive data", "Modify database records", "Make a service unavailable", "Gain administrator access"], "correct": 2},
            {"round": 2, "domain": "Cybersecurity", "text": "Encryption techniques are classified based on how many keys are used for securing data. Which encryption method uses the same key for both encryption and decryption?", "options": ["RSA", "Asymmetric encryption", "Symmetric encryption", "Hashing"], "correct": 2},
            {"round": 2, "domain": "Cloud", "text": "Cloud computing allows organizations to adjust resources based on workload demand. What is the main advantage of cloud computing over traditional on-premise infrastructure?", "options": ["Fixed pricing", "Limited scalability", "On-demand scalability", "Manual server management"], "correct": 2},
            {"round": 2, "domain": "Cloud", "text": "Cloud providers offer different services for computing, databases, and storage. Which AWS service is mainly used to store large amounts of unstructured data such as images and videos?", "options": ["EC2", "RDS", "S3", "Lambda"], "correct": 2},
            {"round": 2, "domain": "Data Science", "text": "In data analysis, understanding how spread out the data values are is very important. Which statistical measure represents the dispersion of data around its mean?", "options": ["Mean", "Median", "Variance", "Mode"], "correct": 2},
            {"round": 2, "domain": "Data Science", "text": "Visualizing data helps identify trends and relationships between variables. Which type of chart is best suited for showing the relationship between two numerical variables?", "options": ["Histogram", "Bar chart", "Scatter plot", "Pie chart"], "correct": 2},
            {"round": 2, "domain": "Big Data", "text": "Big data frameworks differ in how they process and store large datasets. What is the key performance advantage of Apache Spark when compared to Hadoop MapReduce?", "options": ["Better user interface", "In-memory data processing", "Smaller file size", "Built-in visualization"], "correct": 1},
            {"round": 2, "domain": "Big Data", "text": "Hadoop consists of multiple components that handle storage and processing. Which Hadoop component is responsible for storing data across multiple machines in a fault-tolerant way?", "options": ["YARN", "MapReduce", "HDFS", "Spark"], "correct": 2},
            
            {"round": 3, "domain": "AI/ML", "text": "Which optimization algorithm is commonly used to train neural networks?", "options": ["K-Means", "Apriori", "Gradient Descent", "FP-Growth"], "correct": 2},
            {"round": 3, "domain": "Cybersecurity", "text": "Which cybersecurity principle ensures data is not altered by unauthorized users?", "options": ["Confidentiality", "Availability", "Integrity", "Authentication"], "correct": 2},
            {"round": 3, "domain": "Cloud", "text": "In cloud computing, which service model provides the highest level of control to the user?", "options": ["SaaS", "PaaS", "IaaS", "FaaS"], "correct": 2},
            {"round": 3, "domain": "Data Science", "text": "Which technique is used to evaluate the performance of a machine learning model on unseen data?", "options": ["Feature scaling", "Cross-validation", "Data cleaning", "Data wrangling"], "correct": 1},
            {"round": 3, "domain": "Big Data", "text": "What is the main role of a NameNode in Hadoop?", "options": ["Stores actual data blocks", "Executes MapReduce jobs", "Manages metadata of HDFS", "Performs data visualization"], "correct": 2},
        ]
        
        for q_data in questions_data:
            Question.objects.create(
                round=q_data['round'],
                domain=q_data['domain'],
                text=q_data['text'],
                option_a=q_data['options'][0],
                option_b=q_data['options'][1],
                option_c=q_data['options'][2],
                option_d=q_data['options'][3],
                correct_option=q_data['correct']
            )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(questions_data)} questions'))
