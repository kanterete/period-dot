const db = require("../config/db")


const getCycleDay = (req, res) => {
    const [cycleDay] = await db.execute("SELECT id,	cycle_id,	day_date,	phase,	body_temp,	bleeding_level,	pain_level,	mood,	note,	created_at	from cycle_day");
    return cycleDay
}