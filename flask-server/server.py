from flask import Flask, request, jsonify
from uuid import uuid4
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Almacenamiento de contactos en memoria
contacts = []

# Clase para representar un contacto
class Contact:
    def __init__(self, nombre, apellido, telefono, email, calle, estado, empresa, cargo, notas, cumpleaños):
        self.id = str(uuid4())
        self.nombre = nombre
        self.apellido = apellido
        self.telefono = telefono
        self.email = email
        self.calle = calle
        self.estado = estado
        self.empresa = empresa
        self.cargo = cargo
        self.notas = notas
        self.cumpleaños = cumpleaños

# Ruta para obtener todos los contactos
@app.route("/api/contacts", methods=['GET'])
def get_all_contacts():
    datos_contactos = [contact.__dict__ for contact in contacts]
    return jsonify({"Contactos": datos_contactos})

# Ruta para agregar un nuevo contacto
@app.route("/api/contacts", methods=['POST'])
def add_new_contact():
    data = request.json
    new_contact = Contact(**data)
    contacts.append(new_contact)
    return jsonify({"message": "Contacto añadido exitosamente", "id": new_contact.id})

# Ruta para obtener un contacto específico
@app.route("/api/contacts/<string:id>", methods=['GET'])
def get_contact(id):
    contact = next((contact for contact in contacts if contact.id == id), None)
    if contact:
        return jsonify(contact.__dict__)
    return jsonify({"message": "Contacto no encontrado"}), 404

# Ruta para actualizar un contacto existente
@app.route("/api/contacts/<string:id>", methods=['PATCH'])
def update_contact(id):
    data = request.json
    contact = next((contact for contact in contacts if contact.id == id), None)
    if contact:
        for key, value in data.items():
            setattr(contact, key, value)
        return jsonify({"message": "Contacto actualizado exitosamente"})
    return jsonify({"message": "Contacto no encontrado"}), 404

# Ruta para eliminar un contacto
@app.route("/api/contacts/<string:id>", methods=['DELETE'])
def delete_contact(id):
    global contacts
    contacts = [contact for contact in contacts if contact.id != id]
    return jsonify({"message": "Contacto eliminado exitosamente"})

@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')
if __name__ == "__main__":
    app.run(debug=True)
