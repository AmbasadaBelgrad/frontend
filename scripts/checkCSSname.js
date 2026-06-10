export default {
  rules: {
    "css-modules-camelcase": {
      meta: {
        type: "problem",
        fixable: "code",
        messages: {
          notCamelCase:
            'Имя класса "{{name}}" должно быть в camelCase. Используйте "{{fixed}}" вместо "{{name}}".',
        },
      },
      create(context) {
        function toCamelCase(str) {
          return str.replace(/[-_]([a-z])/g, (_, letter) =>
            letter.toUpperCase(),
          );
        }

        function isCamelCase(str) {
          return /^[a-z][a-zA-Z0-9]*$/.test(str);
        }

        return {
          MemberExpression(node) {
            if (
              node.object.type === "Identifier" &&
              node.object.name === "styles" &&
              node.property.type === "Identifier"
            ) {
              const propertyName = node.property.name;

              if (!isCamelCase(propertyName)) {
                const fixed = toCamelCase(propertyName);
                context.report({
                  node: node.property,
                  messageId: "notCamelCase",
                  data: {
                    name: propertyName,
                    fixed: fixed,
                  },
                  fix(fixer) {
                    return fixer.replaceText(node.property, fixed);
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};