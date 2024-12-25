import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud

# Load the data
data = pd.read_csv('tasks.csv')

# Ensure matplotlib displays properly
plt.rcParams["figure.figsize"] = (12, 6)

# Function to save plots
def save_plot(title):
    plt.title(title, fontsize=16)
    plt.tight_layout()
    plt.savefig(f"{title.replace(' ', '_')}.png")
    plt.show()

# 1. General Employee Analysis

# Count of Employees by Employment Type
data['type'].value_counts().plot(kind='bar', color='skyblue')
save_plot("Count of Employees by Employment Type")

# Employee Status Distribution
data['status'].value_counts().plot(kind='pie', autopct='%1.1f%%', colors=['gold', 'lightgreen'])
save_plot("Employee Status Distribution")

# Employee Count by Designation
data['designation'].value_counts().plot(kind='barh', color='lightcoral')
save_plot("Employee Count by Designation")

# Employee Count by Category
data['category'].value_counts().plot(kind='bar', color='mediumseagreen')
save_plot("Employee Count by Category")

# 2. Location and Territory Analysis

# Employee Distribution by Territory
data['territory'].value_counts().plot(kind='bar', color='cornflowerblue')
save_plot("Employee Distribution by Territory")

# Employee Distribution by Location
data['location'].value_counts().plot(kind='bar', color='darkorange')
save_plot("Employee Distribution by Location")

# Territory and Category Overlap
category_territory = data.groupby(['territory', 'category']).size().unstack()
category_territory.plot(kind='bar', stacked=True, colormap='viridis')
save_plot("Territory and Category Overlap")

# 3. Managerial and Reporting Insights

# Employee Count per Project Manager
data['projectManager'].value_counts().head(10).plot(kind='barh', color='plum')
save_plot("Employee Count per Project Manager")

# Employee Count per Reporting Manager
data['reportingManager'].value_counts().head(10).plot(kind='barh', color='teal')
save_plot("Employee Count per Reporting Manager")

# Overlap Between Project and Reporting Managers
manager_overlap = pd.crosstab(data['projectManager'], data['reportingManager'])
sns.heatmap(manager_overlap, cmap='coolwarm', cbar=False)
save_plot("Overlap Between Project and Reporting Managers")

# 4. Grade and Role Analysis

# Employee Count by Grade
data['grade'].value_counts().plot(kind='bar', color='royalblue')
save_plot("Employee Count by Grade")

# Grade Distribution Across Designations
grade_designation = data.groupby(['grade', 'designation']).size().unstack()
grade_designation.plot(kind='bar', stacked=True, colormap='tab10')
save_plot("Grade Distribution Across Designations")

# Profile Titles by Category
from squarify import normalize_sizes, squarify
sizes = data['category'].value_counts(normalize=True)
sizes = normalize_sizes(sizes, 100, 100)
squarify(sizes, label=sizes.index)
save_plot("Category - Squarify")
