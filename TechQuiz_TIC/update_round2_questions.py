import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from quiz.models import Question

# Round 2 Questions - AI and Algorithms
round2_questions = [
    {
        "text": "What is AI primarily about?",
        "option_a": "Fast hardware",
        "option_b": "Machines mimicking human intelligence",
        "option_c": "Only coding algorithms",
        "option_d": "Storing big data",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "In AI, 'agent' refers to:",
        "option_a": "Software spy",
        "option_b": "Entity perceiving environment and acting",
        "option_c": "Database query",
        "option_d": "Network router",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "Turing Test checks if machine can:",
        "option_a": "Solve math fast",
        "option_b": "Imitate human conversation",
        "option_c": "Draw images",
        "option_d": "Play music",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "Which is NOT a type of AI?",
        "option_a": "Narrow AI",
        "option_b": "General AI",
        "option_c": "Super AI",
        "option_d": "Cloud AI",
        "correct_option": 3,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "PEAS in AI stands for: Performance, Environment, Actuators, Sensors",
        "option_a": "True",
        "option_b": "False",
        "option_c": "Partially true",
        "option_d": "None",
        "correct_option": 0,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "Search algorithm BFS explores:",
        "option_a": "Deep first",
        "option_b": "Level by level",
        "option_c": "Randomly",
        "option_d": "Backwards",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "In AI, heuristic means:",
        "option_a": "Exact solution",
        "option_b": "Rule of thumb",
        "option_c": "Hardware rule",
        "option_d": "Data rule",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "Which tree traversal is like stack?",
        "option_a": "Inorder",
        "option_b": "Preorder",
        "option_c": "Postorder",
        "option_d": "Level order",
        "correct_option": 1,
        "round": 2,
        "domain": "Data Science"
    },
    {
        "text": "Prolog is used for:",
        "option_a": "Graphics",
        "option_b": "Logic programming",
        "option_c": "Web dev",
        "option_d": "OS kernels",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "Alpha-Beta pruning in games:",
        "option_a": "Increases nodes",
        "option_b": "Reduces search tree",
        "option_c": "Adds branches",
        "option_d": "Ignores moves",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "What does FSM stand for in AI?",
        "option_a": "Fast State Machine",
        "option_b": "Finite State Machine",
        "option_c": "Full Stack Method",
        "option_d": "File System Manager",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "Recursion base case prevents:",
        "option_a": "Fast execution",
        "option_b": "Infinite loop",
        "option_c": "Memory leak",
        "option_d": "All",
        "correct_option": 1,
        "round": 2,
        "domain": "Data Science"
    },
    {
        "text": "In sorting, which is stable?",
        "option_a": "Quick sort",
        "option_b": "Merge sort",
        "option_c": "Heap sort",
        "option_d": "Selection sort",
        "correct_option": 1,
        "round": 2,
        "domain": "Data Science"
    },
    {
        "text": "AI knowledge base uses:",
        "option_a": "Only numbers",
        "option_b": "Facts and rules",
        "option_c": "Images only",
        "option_d": "Videos",
        "correct_option": 1,
        "round": 2,
        "domain": "AI/ML"
    },
    {
        "text": "Which data structure is LIFO?",
        "option_a": "Queue",
        "option_b": "Stack",
        "option_c": "Tree",
        "option_d": "Graph",
        "correct_option": 1,
        "round": 2,
        "domain": "Data Science"
    }
]

# Create questions
created_count = 0
for q_data in round2_questions:
    question = Question.objects.create(**q_data)
    created_count += 1
    print(f"✓ Created Q{created_count}: {question.text[:60]}...")

print(f"\n{'='*70}")
print(f"✅ Successfully added {created_count} Round 2 questions!")
print(f"📊 Total Round 2 questions now in database: {Question.objects.filter(round=2).count()}")
print(f"{'='*70}")
