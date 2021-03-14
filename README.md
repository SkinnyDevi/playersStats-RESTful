# playersStats-RESTful

This project uses an API which uses XML to send and receive data.

The client can:
* Add new players with their respective player tag, player UID, level, defense level, attack level, and add if they're in a clan or not.
* Show all added players.

### Screenshots

* Adding a player:

![add_player](https://github.com/SkinnyDevi/playersStats-RESTful/blob/main/web/img/add_player.png)

* Showing all players:

![show players](https://github.com/SkinnyDevi/playersStats-RESTful/blob/main/web/img/show_players.png)

### Dependencies

You will need all default NodeJS modules for this to work.

See the links below on how to get them setup.

### Installing

Open a command line console and clone this project.

```
git clone https://github.com/SkinnyDevi/playersStats-RESTful
```

Go to the project directory

```
cd playersStats-RESTful
```

Go to the api directory

```
cd api
```

Install all dependencies

```
npm install
```

Boot your API

```
node playerIndex.js
```

Test the project with a browser

```
open your favourite browser with the file web/player.html
```

### XML and XSD files 

An example of the format of the XML file sent from client to web service to add a new player:

```
<?xml version="1.0" encoding="UTF-8"?>
<players>
  <player pUID="Formatted UID with Regex">
    <playerTag>String</playerTag>
    <level>Int 1 - 100</level>
    <defenseStat>Int 1 - 1000</defenseStat>
    <attackStat>Int 1 - 1000</attackStat>
    <hasClan>true/false</hasClan>
  </player>
</players>
```

An example of XML file stored in the Server:

```
<?xml version="1.0" encoding="UTF-8"?>
<players>
  <player pUID="AB1:akc8383UAAS">
    <playerTag>myTag51</playerTag>
    <level>50</level>
    <defenseStat>651</defenseStat>
    <attackStat>587</attackStat>
    <hasClan>true</hasClan>
  </player>
</players>
```

XSD file in Server:

```
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
	<xs:element name="players">
		<xs:complexType>
			<xs:sequence>
				<xs:element name="player" type="playerInfo" minOccurs="0" maxOccurs="unbounded"></xs:element>
			</xs:sequence>
		</xs:complexType>
	</xs:element>

    <!-- Types, Restrictions and Regex -->
	<xs:complexType name="playerInfo">
		<xs:sequence>
			<xs:element name="playerTag" type="xs:string"></xs:element>
			<xs:element name="level" type="levelCap"></xs:element>
			<xs:element name="defenseStat" type="xs:positiveInteger"></xs:element>
			<xs:element name="attackStat" type="xs:positiveInteger"></xs:element>
			<xs:element name="hasClan" type="xs:boolean"></xs:element>
		</xs:sequence>
		<xs:attributeGroup ref="pUIDG"></xs:attributeGroup>
	</xs:complexType>

	<xs:attributeGroup name="pUIDG">
		<xs:attribute name="pUID" type="UIDFormat"></xs:attribute>
	</xs:attributeGroup>

	<xs:simpleType name="levelCap">
		<xs:restriction base="xs:positiveInteger">
			<xs:maxExclusive value="100"></xs:maxExclusive>
		</xs:restriction>
	</xs:simpleType>

	<xs:simpleType name="statsCap">
		<xs:restriction base="xs:positiveInteger">
			<xs:maxExclusive value="1000"></xs:maxExclusive>
		</xs:restriction>
	</xs:simpleType>
	
	<xs:simpleType name="UIDFormat">
		<xs:restriction base="xs:string">
			<xs:pattern value="[A-Z]{2}[0-9]:[a-z]{3}[0-9]{4}[A-Z]{2}(EU|US|AS)"></xs:pattern>
		</xs:restriction>
	</xs:simpleType>
</xs:schema>
```

## Related links

* [NodeJS](https://nodejs.org/es/) - Node.js un entorno de ejecución para JavaScript
* [xmldom](https://github.com/jindw/xmldom) - A JavaScript implementation of W3C DOM for Node.js.
* [xsd-schema-validator](https://www.npmjs.com/package/xsd-schema-validator) - Allows XML validation with an XML Schema.
* [express-xml-bodyparser](https://github.com/remind101/express-xml-bodyparser) - For those rare cases when you have to parse incoming raw xml-body requests. This middleware works with any connect- or express-based nodejs application.
* [AJAX](https://www.w3schools.com/js/js_ajax_intro.asp) - Allows an HTML client to read, update, create and detele data from a web service.

