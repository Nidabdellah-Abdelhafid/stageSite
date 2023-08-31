from flask_mysqldb import MySQL
from mysql.connector import Error
from flask import Flask, render_template, request, url_for, redirect, flash

import subprocess
import psycopg2
from datetime import datetime
from PIL import Image

from urllib.parse import urlparse


import os

from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads/'

app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['MYSQL_HOST'] = 'bfdj3j5fb85i7sm1epvz-mysql.services.clever-cloud.com'
app.config['MYSQL_USER'] = 'uz7gmfxiqthh9yjw'
app.config['MYSQL_PASSWORD'] = 'JtY9lZvlr545yGJwjloT'
app.config['MYSQL_DB'] = 'bfdj3j5fb85i7sm1epvz'

mysqla=MySQL(app)
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Set up Chrome options


def insert_data(photo, name, poste, phoneNum, email):
    try:
        connectiona =  psycopg2.connect(
            host='dpg-cjnon8ocfp5c73eunki0-a.oregon-postgres.render.com',
            database='vendeurdb',
            user='atlasvoyage',
            password='9pyfwrhghabxLmFLyrhW04mOlqXoBywi'
        )


        cursor = connectiona.cursor()

        # Assuming you have a table named 'vendeur' with appropriate columns
        query = "INSERT INTO vendeur (photo, name, poste, phoneNum, email) VALUES (%s, %s, %s, %s, %s)"
        values = (photo, name, poste, phoneNum, email)
        cursor.execute(query, values)

        connectiona.commit()
        print("isert data")
        cursor.close()


    except Error as e:
        print("Error:", e)
    finally:
        connectiona.close()



def is_valid_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

@app.route('/pay', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Récuperer les donnees du formulaire
        bg_mob = request.form['bg-mob']
        bg_web = request.form['bg-web']
        g_titre = request.form['g-titre']
        sous_titre = request.form['sous-titre']
        select_text = request.form['select-text']
        desc_titre = request.form['desc-titre']
        description = request.form['description']

        image1 = request.form['image1']
        image2 = request.form['image2']
        voirplus = request.form['voirplus']
        image3 = request.form['image3']
        image4 = request.form['image4']
        image5 = request.form['image5']
        image6 = request.form['image6']
        Periode = request.form['Periode']
        Periode_mob = request.form['Periode-mob']
        bannee_web = request.form['bannee-web']
        banner_mob = request.form['banner-mob']

        visaType = request.form['visaType']
        dureeVole = request.form['dureeVole']
        heureLocale = request.form['heureLocale']
        monnaieLocale = request.form['monnaieLocale']
        langueParlee = request.form['langueParlee']
        vaccinsType = request.form['vaccinsType']

        if 'try_button' in request.form:
            return render_template('pageAtest.html', bg_mob=bg_mob, bg_web=bg_web,
                                   g_titre=g_titre,
                                   sous_titre=sous_titre,
                                   select_text=select_text,
                                   desc_titre=desc_titre,
                                   description=description,
                                   image1=image1,
                                   image2=image2,
                                   voirplus=voirplus,
                                   image3=image3,
                                   image4=image4,
                                   image5=image5,
                                   image6=image6,
                                   Periode=Periode,
                                   Periode_mob=Periode_mob,
                                   bannee_web=bannee_web,
                                   banner_mob=banner_mob,
                                   visaType=visaType,
                                   dureeVole=dureeVole,
                                   heureLocale=heureLocale,
                                   monnaieLocale=monnaieLocale,
                                   langueParlee=langueParlee,
                                   vaccinsType=vaccinsType
                                   )

    return render_template('Pays.html')


@app.route('/')
def pro():
    return render_template("about.html")

@app.route('/form', methods=['GET', 'POST'])
def formadd():
    if request.method == 'POST':
        bg_mob = request.form['bg_mob']
        bg_web = request.form['bg_web']
        g_titre = request.form['g_titre']
        jours = request.form['jours']
        meilleurePeriode = request.form['MeilleurePer']
        etapesPrevues = request.form['EtapesPrev']
        prix = request.form['Prix']
        descriptionc = request.form['descriptionc']
        image = request.form['image']

        moneyValue = request.form['Money']
        experience = request.form['Experience']
        tourGuide = request.form['Tour']

        picture1 = request.form['Picture1']
        fullName1 = request.form['Name1']
        date11 = request.form['Date1']
        if date11 !="":
            date111 =datetime.strptime(date11, '%Y-%m')
            date1 = date111.strftime('%B %Y')
        else:
            date1 =""

        comment1 = request.form['Comment1']

        picture2 = request.form['Picture2']
        fullName2 = request.form['Name2']
        date22 = request.form['Date2']
        if date22 != "":
            date222 = datetime.strptime(date22, '%Y-%m')
            date2 = date222.strftime('%B %Y')
        else:
            date2 =""
        comment2 = request.form['Comment2']

        picture3 = request.form['Picture3']
        fullName3 = request.form['Name3']
        date33 = request.form['Date3']
        if date33 != "":
            date333 = datetime.strptime(date33, '%Y-%m')
            date3 =date333.strftime('%B %Y')
        else:
            date3 =""

        comment3 = request.form['Comment3']

        bW = request.form['bannee_web']

        if 'btn_tryj' in request.form:
            return render_template('page-produit-test.html',
                                   bg_mob=bg_mob,
                                   bg_web=bg_web,
                                   g_tittre=g_titre,
                                   Jours=jours,
                                   MeilleurePeriode=meilleurePeriode,
                                   EtapesPrevues=etapesPrevues,
                                   Prix=prix,
                                   Description=descriptionc,
                                   Image=image,
                                   
                                   MoneyValue=moneyValue,
                                   Experience=experience,
                                   TourGuide=tourGuide,
                                   Picture1=picture1,
                                   FullName1=fullName1,
                                   Date1=date1,
                                   Comment1=comment1,
                                   Picture2=picture2,
                                   FullName2=fullName2,
                                   Date2=date2,
                                   Comment2=comment2,
                                   Picture3=picture3,
                                   FullName3=fullName3,
                                   Date3=date3,
                                   Comment3=comment3,
                                   BW=bW
                                   )

    return render_template('form.html')


@app.route('/vender' ,methods=['GET', 'POST'])
def vender():

    try:
        connectiona = psycopg2.connect(
            host='dpg-cjnon8ocfp5c73eunki0-a.oregon-postgres.render.com',
            database='vendeurdb',
            user='atlasvoyage',
            password='9pyfwrhghabxLmFLyrhW04mOlqXoBywi'
        )


        cursor = connectiona.cursor()

        # Assuming you have a table named 'vendeur' with appropriate columns
        query = "SELECT * FROM vendeur"

        cursor.execute(query)
        dataa = cursor.fetchall()
        connectiona.commit()
        print("select data")
        cursor.close()


    except Error as e:
        print("Error:", e)
    finally:
        connectiona.close()


    disimg="none"
    alertmsg=""
    if request.method == 'POST':
        if 'teleBtn' in request.form:

            url = request.form['url']
            script_path = os.path.join(os.path.dirname(__file__), 'screenshot.js')
            subprocess.run(['node', script_path, url])
            if is_valid_url(url):

                print("Valid URL")

                def remove_whitespace(screenshot_path):
                    # Open the image
                    img = Image.open("static/img/" + screenshot_path)

                    # Convert to RGBA to handle transparency (if needed)
                    img = img.convert('RGBA')

                    # Get the image dimensions
                    width, height = img.size

                    # Find the bottom-most pixel that is not white
                    last_non_white_pixel_y = height - 1
                    for y in range(height - 1, -1, -1):
                        if any(img.getpixel((x, y))[:-1] != (255, 255, 255) for x in range(width)):
                            last_non_white_pixel_y = y
                            break

                    # Find the right-most pixel that is not white
                    last_non_white_pixel_x = width - 1
                    for x in range(width - 1, -1, -1):
                        if any(img.getpixel((x, y))[:-1] != (255, 255, 255) for y in range(height)):
                            last_non_white_pixel_x = x
                            break

                    # Crop the image to remove the white space at the bottom and right
                    img = img.crop((0, 0, last_non_white_pixel_x + 1, last_non_white_pixel_y + 1))

                    # Save the cropped image
                    img.save('static/img/image_without_whitespace1.png')
                    return img

                    # Call the function with the path to your image
                    # Replace with your image file path

                imgo = remove_whitespace('fullpage_screenshot.png')
                disimg = "block"


                prix = request.form['prixid']
                venderid = request.form['venderid']



                try:
                    connectiona = psycopg2.connect(
                        host='dpg-cjnon8ocfp5c73eunki0-a.oregon-postgres.render.com',
                        database='vendeurdb',
                        user='atlasvoyage',
                        password='9pyfwrhghabxLmFLyrhW04mOlqXoBywi'
                    )

                    cursor = connectiona.cursor()

                    # Assuming you have a table named 'vendeur' with appropriate columns
                    queryq = "SELECT * FROM vendeur where id=" + venderid

                    cursor.execute(queryq)
                    datavenderid = cursor.fetchall()
                    connectiona.commit()
                    print("select data")
                    cursor.close()


                except Error as e:
                    print("Error:", e)
                finally:
                    connectiona.close()

                return render_template('vender.html', prix=prix, disimg=disimg, alertmsg=alertmsg,url=url, dataa=dataa,datavenderid=datavenderid)


            else:
                    print("Not a valid ")
                    alertmsg = "Invalid URL!!"
                    try:
                        connectiona = psycopg2.connect(
                            host='dpg-cjnon8ocfp5c73eunki0-a.oregon-postgres.render.com',
                            database='vendeurdb',
                            user='atlasvoyage',
                            password='9pyfwrhghabxLmFLyrhW04mOlqXoBywi'
                        )

                        cursor = connectiona.cursor()

                        # Assuming you have a table named 'vendeur' with appropriate columns
                        query = "SELECT * FROM vendeur"

                        cursor.execute(query)
                        dataa = cursor.fetchall()
                        connectiona.commit()
                        print("select data")
                        cursor.close()


                    except Error as e:
                        print("Error:", e)
                    finally:
                        connectiona.close()

                    return render_template('vender.html', disimg=disimg,alertmsg=alertmsg,dataa=dataa)

        if 'addvenderbtn' in request.form:

            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            name = request.form['nom_vendeur']
            poste = request.form['poste']
            phoneNum = request.form['phoneNum']
            email = request.form['email']

            if file.filename == '':
                flash('No image selected for uploading')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                insert_data(filename, name, poste, phoneNum, email)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                # print('upload_image filename: ' + filename)

                return redirect(url_for('vender',disimg=disimg,alertmsg=alertmsg, filename=filename,dataa=dataa))
                #return render_template('vender.html', disimg=disimg,alertmsg=alertmsg, filename=filename,dataa=dataa)
            else:
                flash('Allowed image types are - png, jpg, jpeg, gif')
                return redirect(request.url)



    return render_template('vender.html', disimg=disimg,alertmsg=alertmsg,dataa=dataa)



if __name__ == '__main__':
    app.run(host="0.0.0.0",port=5000)
