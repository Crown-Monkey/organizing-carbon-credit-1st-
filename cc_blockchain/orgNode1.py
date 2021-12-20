import datetime
import hashlib
import json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import requests
from urllib.parse import urlparse


class BlockVote:
    def __init__(self):
        self.chain = []
        self.data = []
        self.credit = 1000
        self.calculated_credit = 0
        self.credit_used = 0
        self.create_block(proof=1, previous_hash="0")
        self.nodes = set()


    def create_block(self, proof, previous_hash):
        block = {
            "index": len(self.chain) + 1,
            "timestamp": str(datetime.datetime.now()),
            "proof": proof,
            "alloted_credit": self.credit,
            "calculated_credit": self.calculated_credit,
            "credit_used": self.credit_used,
            "available_credit": self.credit - self.credit_used,
            "previous_hash": previous_hash,
            "data": self.data
        }
        self.data = []
        self.calculated_credit = 0
        self.chain.append(block)
        return block

    def get_previous_block(self):
        return self.chain[-1]

    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False
        while check_proof is False:
            hash_operation = hashlib.sha256(str(new_proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:4] == "0000":
                check_proof = True
            else:
                new_proof += 1
        return new_proof

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def is_chain_valid(self, chain):
        previous_block = chain[0]
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index]
            if block["previous_hash"] != self.hash(previous_block):
                return False
            previous_proof = previous_block["proof"]
            proof = block["proof"]
            hash_operation = hashlib.sha256(str(proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:4] != "0000":
                return False
            previous_block = block
            block_index += 1
        return True

    # def add_votes(self, voter, voted):
    #     self.votes.append(
    #         {
    #             "voter": voter,
    #             "voted": voted
    #         }
    #     )
    #     previous_block = self.get_previous_block()
    #     return previous_block["index"] + 1
    def add_data(self, org_id, co2, ch4, n2o, hfc, pfc, sf6, date):

        self.calculated_credit = (float(co2) + (25 * float(ch4)) + (298 * float(n2o)) + (1430 * float(hfc)) + (7390 * float(pfc)) + (22800 * float(sf6)))/1000
        self.credit_used += self.calculated_credit
        self.data.append(
            {
                "org_id": org_id,
                "c02": co2,
                "ch4": ch4,
                "n20": n2o,
                "hfc": hfc,
                "pfc": pfc,
                "sf6": sf6,
                "alloted_credit": self.credit,
                "calculated_credit": self.calculated_credit,
                "credit_used": self.credit_used,
                "available_credit": self.credit - self.credit_used,
                "date": date

            }
        )
        previous_block = self.get_previous_block()
        return previous_block["index"] + 1


    def add_node(self, address):
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def replace_chain(self):
        network = self.nodes
        longest_chain = None
        max_length = len(self.chain)

        for node in network:
            response = requests.get(f"http://{node}/get_chain")
            if response.status_code == 200:
                length = response.json()["length"]
                chain = response.json()["chain"]
                if length > max_length and self.is_chain_valid(chain):
                    max_length = length
                    longest_chain = chain
        if longest_chain:
            self.chain = longest_chain
            return True
        return False

    # def count_voted1(self):
    #     count1 = 0
    #     for block in range(len(self.chain)-1):
    #         if self.chain[block+1]["votes"][0]["voted"] == "Kalash":
    #             count1 = count1 + 1
    #     return count1
    #
    # def count_voted2(self):
    #     count2 = 0
    #     for block in range(len(self.chain)-1):
    #         if self.chain[block+1]["votes"][0]["voted"] == "Abhishek":
    #             count2 = count2 + 1
    #     return count2
    def org_transaction(self, org_id):
        org_trans = []
        print(self.chain[1]["data"][0]["org_id"])
        print(len(self.chain))
        for block in range(len(self.chain)-1):
            if (self.chain[block+1]["data"][0]["org_id"]) == org_id:
                org_trans.append(self.chain[block+1]["data"][0])
        return org_trans



app = Flask(__name__)
CORS(app)
# node_address = str(uuid4()).replace("-", "")

blockvote = BlockVote()


@app.route("/mine_block", methods=["GET"])
def mine_block():
    previous_block = blockvote.get_previous_block()
    previous_proof = previous_block["proof"]
    proof = blockvote.proof_of_work(previous_proof)
    previous_hash = blockvote.hash(previous_block)
    # blockvote.add_votes(voter="___", voted="___")
    block = blockvote.create_block(proof, previous_hash)
    response = {
        "message": "You mined a block.",
        "index": block["index"],
        "timestamp": block["timestamp"],
        "proof": block["proof"],
        "previous_hash": block["previous_hash"],
        "data": block["data"]
    }
    return jsonify(response), 200


@app.route("/get_creditData", methods=["GET"])
def get_creditData():
    response = {
        "alloted_credit": blockvote.credit,
        "credit_used": blockvote.credit_used,
        "available_credit": blockvote.credit - blockvote.credit_used
    }
    return jsonify(response), 200


@app.route("/get_chain", methods=["GET"])
def get_chain():
    response = {
        "chain": blockvote.chain,
        "length": len(blockvote.chain)
    }
    return jsonify(response), 200


@app.route("/is_valid", methods=["GET"])
def is_valid():
    iss_valid = blockvote.is_chain_valid(blockvote.chain)
    if iss_valid:
        response = {"message": "Blockvote is valid!",
                    }
    else:
        response = {"message": "Danger,Blockvote is not valid."}
    return jsonify(response), 200


@app.route("/add_data", methods=["POST"])
def add_data():
    json = request.get_json()
    data_keys = ["org_id", "co2", "ch4", "n2o", "hfc", "pfc", "sf6", "date"]
    if not all(key in json for key in data_keys):
        return "Elements are missing", 400
    index = blockvote.add_data(json["org_id"], json["co2"], json["ch4"], json["n2o"], json["hfc"], json["pfc"], json["sf6"], json["date"])
    response = {"message": f"This data is added to block {index}"}
    return jsonify(response), 201


@app.route("/get_orgTrans", methods=["POST"])
def get_orgTrans():
    json = request.get_json()
    transactions = blockvote.org_transaction(json["org_id"])
    response = {"transactions": transactions}
    return jsonify(response), 201


# @app.route("/get_result", methods=["GET"])
# def get_result():
#     Kalash_votes = int(blockvote.count_voted1())
#     Abhishek_votes = int(blockvote.count_voted2())
#     print(Kalash_votes)
#     print(Abhishek_votes)
#     if Kalash_votes > Abhishek_votes:
#         response = {"Kalash": Kalash_votes,
#                     "Abhishek": Abhishek_votes,
#                     "message": f"Congratulation, Kalash won the election by {Kalash_votes - Abhishek_votes} vote"}
#     elif Abhishek_votes > Kalash_votes:
#         response = {"Kalash": Kalash_votes,
#                     "Abhishek": Abhishek_votes,
#                     "message": f"Congratulation, Abhishek won the election by {-Kalash_votes + Abhishek_votes} vote"}
#     else:
#         response = {"Kalash": Kalash_votes,
#                     "Abhishek": Abhishek_votes,
#                     "message": "It's a tie."
#                     }
#     return jsonify(response), 200




@app.route("/connect_node", methods=["POST"])
def connect_node():
    # json = request.get_json()
    nodes = ["http://127.0.0.1:2708","http://127.0.0.1:2709"]

    if nodes is None:
        return "No node", 400
    for node in nodes:
        blockvote.add_node(node)
    response = {"message": "All the nodes are now connected",
                "total_nodes": list(blockvote.nodes)}
    return jsonify(response), 201


@app.route("/replace_chain", methods=["GET"])
def replace_chain():
    is_chain_replaced = blockvote.replace_chain()
    if is_chain_replaced:
        response = {"message": "The nodes had different chains so the chain was replaced by the longest one.",
                    "new_chain": blockvote.chain}
        return jsonify(response), 200
    else:
        response = {"message": "All good. Chain is the longest one",
                    "actual_chain": blockvote.chain}
        return jsonify(response), 200


app.run(host="0.0.0.0", port=2707)