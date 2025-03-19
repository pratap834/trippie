import requests
from bs4 import BeautifulSoup
import os
import re
import time
from urllib.parse import quote_plus

def download_location_images(location, num_images=5, output_dir="downloaded_images"):
    """
    Download images related to a specific location using Google Images search.
    
    Args:
        location (str): The location to search for images of
        num_images (int): Maximum number of images to download
        output_dir (str): Directory to save downloaded images
        
    Returns:
        list: Paths to downloaded images
    """
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Format the search query
    search_query = f"{location} landscape"
    encoded_query = quote_plus(search_query)
    
    # User agent to mimic a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    # Google Images search URL
    url = f"https://www.google.com/search?q={encoded_query}&tbm=isch"
    
    print(f"Searching for images of {location}...")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to retrieve search results: {response.status_code}")
        return []
    
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Extract image URLs from the page
    # Note: Google Images loads dynamically, so this method will only get initial images
    img_tags = soup.find_all('img')
    img_urls = []
    
    for img in img_tags:
        if 'src' in img.attrs and img['src'].startswith('http'):
            img_urls.append(img['src'])
    
    # Filter out Google UI images and icons (typically small)
    img_urls = [url for url in img_urls if not url.endswith('.gif') and not url.endswith('.svg')]
    
    # Download the images
    downloaded_paths = []
    count = 0
    
    print(f"Found {len(img_urls)} images. Downloading up to {num_images}...")
    
    for img_url in img_urls:
        if count >= num_images:
            break
            
        try:
            # Download the image
            img_response = requests.get(img_url, headers=headers, timeout=10)
            
            if img_response.status_code == 200:
                # Generate a filename based on location and index
                file_extension = "jpg"  # Default extension
                content_type = img_response.headers.get('Content-Type', '')
                
                if 'png' in content_type.lower():
                    file_extension = "png"
                elif 'jpeg' in content_type.lower() or 'jpg' in content_type.lower():
                    file_extension = "jpg"
                elif 'gif' in content_type.lower():
                    file_extension = "gif"
                elif 'webp' in content_type.lower():
                    file_extension = "webp"
                
                # Create a safe filename
                safe_location = re.sub(r'[^\w\s]', '', location).replace(' ', '_').lower()
                filename = f"{safe_location}_{count+1}.{file_extension}"
                filepath = os.path.join(output_dir, filename)
                
                # Save the image
                with open(filepath, 'wb') as f:
                    f.write(img_response.content)
                
                downloaded_paths.append(filepath)
                print(f"Downloaded: {filepath}")
                count += 1
                
                # Be nice to the server
                time.sleep(1)
            
        except Exception as e:
            print(f"Error downloading image: {e}")
            continue
    
    print(f"Downloaded {count} images of {location}")
    return downloaded_paths

# Example usage
if __name__ == "__main__":
    location = input("Enter a location to download images of: ")
    num_images = int(input("Enter number of images to download (default 5): ") or "5")
    downloaded_images = download_location_images(location, num_images)
    
    print("\nDownload summary:")
    print(f"Location: {location}")
    print(f"Images downloaded: {len(downloaded_images)}")
    for img in downloaded_images:
        print(f" - {img}")