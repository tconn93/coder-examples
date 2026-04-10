#!/bin/bash

# create-projects-dirs.sh
# Creates directory structure for the 10 coding agent test projects

echo "Creating 10 project directories..."

mkdir -p finance-tracker
mkdir -p recipe-generator
mkdir -p task-manager
mkdir -p url-shortener
mkdir -p realtime-chat
mkdir -p mini-ecommerce
mkdir -p weather-dashboard
mkdir -p blog-platform
mkdir -p workout-tracker
mkdir -p movie-recommender

# Optional: Create a PLAN.md placeholder in each folder
for dir in finance-tracker recipe-generator task-manager url-shortener realtime-chat mini-ecommerce weather-dashboard blog-platform workout-tracker movie-recommender; do
    if [ ! -f "$dir/PLAN.md" ]; then
        echo "# PLAN.md for $dir" > "$dir/PLAN.md"
        echo "This is the PLAN.md for the $dir project." >> "$dir/PLAN.md"
        echo "Replace this with the full project plan." >> "$dir/PLAN.md"
    fi
done

echo "✅ Done! 10 project directories created."
echo ""
echo "Directory structure:"
tree -L 1 || ls -1
