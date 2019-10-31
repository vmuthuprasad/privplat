import psycopg2
import os

def migrate():
    hostname=os.environ['POSTGRES_HOST']
    port=os.environ['POSTGRES_PORT']
    database=os.environ['POSTGRES_DB']
    username=os.environ['POSTGRES_USER']
    password=os.environ['POSTGRES_PASSWORD']

    conn = None
    try:
        # connect to the PostgreSQL server
        conn = psycopg2.connect(host=hostname,database=database, user=username, password=password, port=port)
        # create a cursor
        cur = conn.cursor()
        cur.execute("CREATE TABLE SCANS(ID serial PRIMARY KEY,scan_date DATE NOT NULL DEFAULT CURRENT_DATE)")
        print("Table created")
        # close the communication with the PostgreSQL
        cur.close()
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
            if conn is not None:
                conn.close()
                print('Database connection closed.')

if __name__ == '__main__':
    migrate()