from app.models import db, Task, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_tasks():
    task1 = Task(
        user_id=1,
        name='Walk the dog',
        description="Take Gigi for a walk around the neighborhood",
        priority="B",
        task_duration="30",
        due_date="2/25/23",
        recurring_frequency="daily",
        completed=False
        )
    task2 = Task(
        user_id=1,
        name='Finish Phase 1',
        description="Finish first feature",
        priority="A",
        task_duration="560",
        due_date="2/27/23",
        completed=False
        )
    task3 = Task(
        user_id=1,
        name='Walk the dog',
        description="Finish second feature",
        priority="B",
        task_duration="30",
        due_date="3/2/23",
        completed=False
        )

    testRel1 = Task(user_id=1, name="Finish relationship set-up", parent=task2)
    testRel2 = Task(user_id=1, name="Test relationships through database seeders", parent=testRel1)

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(testRel1)
    db.session.add(testRel2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()
