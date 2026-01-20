import os
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from quiz.models import Question

def populate():
    print("Clearing ALL existing questions...")
    Question.objects.all().delete()
    
    questions_data = [
        { "id": 1, "domain": "AI/ML", "q": "What is a common misconception about overfitting?", "options": ["It always improves model accuracy on new data", "It occurs only when training data is too small", "It makes the model generalize better", "It is fixed by increasing model complexity"], "correct": 1 },
        { "id": 2, "domain": "Cloud", "q": "Which cloud service model gives the LEAST control over OS patching?", "options": ["IaaS", "PaaS", "SaaS", "FaaS"], "correct": 2 },
        { "id": 3, "domain": "Big Data", "q": "Big Data's \"V\" that is MOST tricky to measure accurately?", "options": ["Volume", "Velocity", "Variety", "Veracity"], "correct": 3 },
        { "id": 4, "domain": "AI/ML", "q": "What does \"curse of dimensionality\" primarily confuse beginners with?", "options": ["Too few features", "Distance metrics becoming meaningless in high dimensions", "Faster training times", "Reduced model variance"], "correct": 1 },
        { "id": 5, "domain": "Cybersecurity", "q": "Which is NOT a symmetric encryption algorithm?", "options": ["AES", "DES", "RSA", "Blowfish"], "correct": 2 },
        { "id": 6, "domain": "AI/ML", "q": "Backpropagation confuses because it computes gradients via:", "options": ["Forward pass only", "Chain rule in reverse", "Random search", "Matrix inversion"], "correct": 1 },
        { "id": 7, "domain": "Cloud", "q": "Multi-cloud strategy avoids vendor lock-in but increases what?", "options": ["Cost savings", "Management complexity", "Automatic scaling", "Compliance ease"], "correct": 1 },
        { "id": 8, "domain": "Big Data", "q": "Hadoop's HDFS is designed for:", "options": ["Low latency reads", "Random access", "Small files only", "Single node"], "correct": 0 },
        { "id": 9, "domain": "Data Science", "q": "p-value < 0.05 means:", "options": ["Theory is proven true", "Evidence against null hypothesis (but often confuses causation)", "95% chance result is real", "Sample size is adequate"], "correct": 1 },
        { "id": 10, "domain": "Cybersecurity", "q": "Phishing emails most tricky because they exploit:", "options": ["Zero-day vulnerabilities", "Human psychology", "Firewall gaps", "DNS poisoning"], "correct": 1 },
        { "id": 11, "domain": "AI/ML", "q": "Bias-Variance tradeoff confuses: High bias model is:", "options": ["Overfit", "Underfit, misses patterns", "Perfectly balanced", "Always high variance"], "correct": 1 },
        { "id": 12, "domain": "Cloud", "q": "Serverless computing (e.g., AWS Lambda) bills for:", "options": ["Provisioned capacity only", "Execution duration + memory", "Idle time", "Fixed monthly fee"], "correct": 1 },
        { "id": 13, "domain": "Big Data", "q": "Spark over MapReduce advantage is:", "options": ["Disk-only processing", "In-memory computation", "Better for OLTP", "No fault tolerance"], "correct": 1 },
        { "id": 14, "domain": "AI/ML", "q": "Cross-validation purpose (tricky part)?", "options": ["Speed up training", "Estimate out-of-sample performance reliably", "Avoid feature scaling", "Select random subsets"], "correct": 1 },
        { "id": 15, "domain": "Cybersecurity", "q": "SQL Injection preventable by:", "options": ["Firewalls alone", "Prepared statements/parameterized queries", "Longer passwords", "Antivirus"], "correct": 1 },
        { "id": 16, "domain": "AI/ML", "q": "GANs (Generative Adversarial Networks) pit what against each other?", "options": ["Two classifiers", "Generator vs Discriminator", "Encoder-Decoder", "Reinforcement agents"], "correct": 1 },
        { "id": 17, "domain": "Cloud", "q": "VPC in AWS is analogous to:", "options": ["Public internet", "Virtual private network in your data center", "Load balancer", "S3 bucket"], "correct": 1 },
        { "id": 18, "domain": "Big Data", "q": "CAP theorem states you can't have all three: Consistency, Availability, Partition tolerance. Tricky real-world choice?", "options": ["CP (e.g., HBase)", "AP (e.g., Cassandra)", "CA (traditional RDBMS)", "All possible"], "correct": 1 },
        { "id": 19, "domain": "AI/ML", "q": "Feature selection methods confuse: Wrapper methods are:", "options": ["Fast, univariate", "Use ML model to evaluate subsets (computationally expensive)", "Ignore model performance", "Only for categorical data"], "correct": 1 },
        { "id": 20, "domain": "Cybersecurity", "q": "Zero Trust model assumes:", "options": ["Network inside is safe", "Never trust, always verify", "Perimeter defense suffices", "Users are always authenticated"], "correct": 1 },
        
        # Round 2 Questions (IDs 21-30)
        { "id": 21, "domain": "AI/ML", "q": "In AI, 'agent' refers to:", "options": ["Software spy", "Entity perceiving environment and acting", "Database query", "Network router"], "correct": 1 },
        { "id": 22, "domain": "AI/ML", "q": "PEAS in AI stands for: Performance, Environment, Actuators, Sensors", "options": ["True", "False", "Partially true", "None"], "correct": 0 },
        { "id": 23, "domain": "AI/ML", "q": "Search algorithm BFS explores:", "options": ["Deep first", "Level by level", "Randomly", "Backwards"], "correct": 1 },
        { "id": 24, "domain": "AI/ML", "q": "In AI, heuristic means:", "options": ["Exact solution", "Rule of thumb", "Hardware rule", "Data rule"], "correct": 1 },
        { "id": 25, "domain": "AI/ML", "q": "Which tree traversal is like stack?", "options": ["Inorder", "Preorder", "Postorder", "Level order"], "correct": 1 },
        { "id": 26, "domain": "AI/ML", "q": "Prolog is used for:", "options": ["Graphics", "Logic programming", "Web dev", "OS kernels"], "correct": 1 },
        { "id": 27, "domain": "AI/ML", "q": "Alpha-Beta pruning in games:", "options": ["Increases nodes", "Reduces search tree", "Adds branches", "Ignores moves"], "correct": 1 },
        { "id": 28, "domain": "AI/ML", "q": "Recursion base case prevents:", "options": ["Fast execution", "Infinite loop", "Memory leak", "All"], "correct": 1 },
        { "id": 29, "domain": "AI/ML", "q": "In sorting, which is stable?", "options": ["Quick sort", "Merge sort", "Heap sort", "Selection sort"], "correct": 1 },
        { "id": 30, "domain": "AI/ML", "q": "AI knowledge base uses:", "options": ["Only numbers", "Facts and rules", "Images only", "Videos"], "correct": 1 }
    ]
    
    print(f"Creating {len(questions_data)} questions (Round 1 & 2)...")
    
    for item in questions_data:
        try:
            q = Question.objects.create(
                id=item['id'],
                round=2 if item['id'] > 20 else 1, # Infer Round
                domain=item['domain'],
                text=item['q'],
                option_a=item['options'][0],
                option_b=item['options'][1],
                option_c=item['options'][2],
                option_d=item['options'][3],
                correct_option=item['correct']
            )
        except Exception as e:
            print(f"Error creating Q{item['id']}: {e}")

    print("Population Complete!")

if __name__ == '__main__':
    populate()
